from pythonping import ping
import os
import wmi
from django.contrib.auth import get_user
import pythoncom


class BaseHost():
    def __init__(self, request, hostname):
        self.hostname = hostname
        self.conn = self.connection(request)
        self.status = self.is_up()

    def connection(self, request):
        pythoncom.CoInitialize()
        return wmi.WMI(self.hostname, user=os.getenv("LDAP_ADMIN"), password=os.getenv("LDAP_PASSWORD"))

    ##### MONITORING #####

    # PING
    def is_up(self):
        try:
            response = ping(self.hostname, count=2).success()
        except:
            response = -1

        return response

    # SPACE
    def space_available(self):
        space = []
        search_class = "win32_LogicalDisk"
        props = ["Name", "FreeSpace", "Size"]
        result = self.get_values(search_class, props, {"DriveType": "3"})

        for index, i in enumerate(result):
            space.append({})
            space[index]["Name"] = result[index]['Name']
            space[index]["GB"] = round(
                int(i['FreeSpace'])/(1024**3))  # bytes to GB
            space[index]["Percentage"] = round(
                (int(i['FreeSpace'])*100)/int(i['Size']))  # percentage

        return space

    # RAM
    def ram_usage(self):
        search_class = "win32_operatingsystem"
        props = ["TotalVisibleMemorySize", "FreePhysicalMemory"]
        result = self.get_values(search_class, props)

        return [{
            "GB": round(int(result[0]['FreePhysicalMemory'])/(1024**3), 2),
            "Percentage": round((int(result[0]['FreePhysicalMemory'])*100)/int(result[0]['TotalVisibleMemorySize']))
        }]

    # CPU
    def cpu_usage(self):
        search_class = "win32_Processor"
        props = ["LoadPercentage"]
        result = self.get_values(search_class, props)
        return result

    # UPDATES ?

    # HARDWARE INFO ?
    def hardware_inventory(self):
        # get all properties and values of Win32_ComputerSystem
        # host_name =  {i: getattr(self.conn.Win32_ComputerSystem()[0], i) for i in self.conn.Win32_ComputerSystem.properties}

        # -----------------------HOST-----------------------
        search_class = "Win32_ComputerSystem"
        props = ["Name", "Model", "Manufacturer"]
        host = self.get_values(search_class, props)
        # environment variable (it could has this or not)
        try:
            host[0]['oficina'] = self.conn.Win32_Environment(Name="oficina")[
                0].VariableValue
        except:
            pass

        # -----------------------CPU-----------------------
        search_class = "Win32_Processor"
        props = ["Name", "NumberOfCores",
                 "NumberOfLogicalProcessors", "MaxClockSpeed", ]
        cpu = self.get_values(search_class, props)

        # -----------------------RAM-----------------------
        ram = [{}]
        # ---- RAM CAPACITY
        # converting bytes to GB (Bytes/1024^3)
        ram[0]["Memory"] = round(int(self.conn.Win32_PhysicalMemory()[
            0].Capacity) / (1024**3), 1)
        # ---- RAM SIMS
        ram[0]["N_Sims"] = self.conn.win32_PhysicalMemoryArray()[
            0].MemoryDevices

        # -----------------------DISKS-----------------------
        search_class = "win32_LogicalDisk"
        props = ["Name", "FreeSpace", "Size"]
        disks = self.get_values(search_class, props, {"DriveType": "3"})
        for i in disks:
            i["Size"] = round(int(i['Size'])/(1024**3))
            i["FreeSpace"] = round(int(i['FreeSpace'])/(1024**3))

        # -----------------------BIOS----------------------**-
        search_class = "Win32_BIOS"
        props = ["Name", "Version", ]
        bios = self.get_values(search_class, props)

        # -----------------------DISPLAY-----------------------
        search_class = "Win32_DisplayConfiguration"
        props = ["DeviceName", "DisplayFrequency",
                 "PelsHeight", "PelsWidth"]
        display = self.get_values(search_class, props)

        # -----------------------PRINTERS-----------------------
        search_class = "Win32_Printer"
        props = ["Name", "Default", "Network", "PortName",
                 "DriverName", "ServerName", "ShareName"]
        printer = self.get_values(search_class, props)

        # -----------------------BASEBOARD-----------------------
        search_class = "Win32_BaseBoard"
        props = ["Manufacturer", "Product"]
        motherboard = self.get_values(search_class, props)

        # -----------------------SO-----------------------
        search_class = "Win32_OperatingSystem"
        props = ["Caption", "ServicePackMajorVersion",
                 "ServicePackMinorVersion", ]
        so = self.get_values(search_class, props)

        # -----------------------NETWORK-----------------------
        search_class = "Win32_NetworkAdapterConfiguration"
        props = ["Description", "IPAddress", "DefaultIPGateway"]
        net = self.get_values(search_class, props, {"IPEnabled": 1})
        # net = [i for i in raw_net if i['IPAddress'][0].startswith("172.20") ]

        # RETURN
        return {
            "host": host,
            "network": net,
            "disks": disks,
            "cpu": cpu,
            "ram": ram,
            "so": so,
            "bios": bios,
            "motherboard": motherboard,
            "display": display,
            "printer": printer,
        }

    def get_values(self, s_class, props, filters={}):
        """
        Return input properties of the given class.
        If there are more than 1 result, it will return an array of items(E.G.  )
        """
        values = []

        for i in getattr(self.conn, s_class)(**filters):
            values.append({})  # new object for each result
            for j in props:
                # set the dound value with the name of the prop (E.G. "Name" -> json_obj['Name'] = result.Name)
                values[-1][j] = getattr(i, j)

        # return the item if there is only one item, and not an array with 1 item
        # return values if len(values) > 1 else values[0]
        return values

    # SOFTWARE INFO ?
    def software_inventory(self):
        # -----------------------DRIVERS-----------------------
        search_class = "Win32_PnPSignedDriver"
        props = ["DeviceName", "Manufacturer", "DriverVersion"]
        drivers = self.get_values(search_class, props)

        # -----------------------PROGRAMS-----------------------
        import winreg as wr

        key_path = r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"
        target = "\\\\{}".format(self.hostname)
        rem_reg = wr.ConnectRegistry(None, wr.HKEY_LOCAL_MACHINE)
        rem_key = wr.OpenKey(rem_reg, key_path, 0,
                             wr.KEY_READ | wr.KEY_WOW64_64KEY)
        subkeys = []
        index = 0
        programs = []

        # creating subkeys
        while True:
            try:
                subkey = wr.EnumKey(rem_key, index)
                subkeys.append(subkey)
                index += 1
            except EnvironmentError:
                break

        for sk in subkeys:
            # print(sk)
            programs.append({})
            path = key_path+"\\"+sk
            key = wr.OpenKey(rem_reg, path, 0,
                             wr.KEY_READ | wr.KEY_WOW64_64KEY)
            try:
                programs[-1]['DisplayName'] = str(
                    wr.QueryValueEx(key, 'DisplayName')[0])
                programs[-1]['UninstallString'] = str(
                    wr.QueryValueEx(key, 'UninstallString')[0])
            except:
                # print("Can't retrieve {}".format(sk))
                programs.pop()

        return {
            "drivers": drivers,
            "programs": programs,
            # "test2": names,
        }

    ##### INTERACTIONS #####

    # APAGAR

    def shutdown(self):
        command = "Stop-Computer -ComputerName %s -Credential $credential -Force" % self.hostname
        return self.ps.execute(command)

    # REINICIAR
    def restart(self):
        command = "Restart-Computer -ComputerName %s -Credential $credential -Force" % self.hostname
        return self.ps.execute(command)

    #  WAKE ON LAN ?

    # INSTALAR PARCHES WINDOWS ?

    # INSTALAR/DESINSTALAR PROGRAMAS ?
