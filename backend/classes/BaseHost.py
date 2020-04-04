from pythonping import ping
import os
import wmi
from pypsexec.client import Client
from django.contrib.auth import get_user
import pythoncom


class BaseHost():
    def __init__(self, request, hostname):
        self.hostname = hostname
        self.conn = self.connection(request)
        self.status = self.is_up()

    def connection(self, request):
        pythoncom.CoInitialize()
        return wmi.WMI(self.hostname, user=r"Administrador", password=os.getenv("LDAP_PASSWORD"))

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
        command = "Get-WmiObject win32_logicaldisk -ComputerName {0} -Credential $credential | select deviceid,@{Name='Free';Expression={($_.FreeSpace*100)/$_.Size -as [int]}} | Write-Host".format(
            self.hostname)
        return self.ps.execute(command)

    # RAM
    def ram_usage(self):
        # actually using % to format instead the built-in function because the '{}' of the command create errors
        command = "Get-WmiObject -Credential $credential -ComputerName %s -Class win32_operatingsystem -ErrorAction Stop | select @{Name='ram_usage';Expression={[math]::Round(((($_.TotalVisibleMemorySize - $_.FreePhysicalMemory)*100)/ $_.TotalVisibleMemorySize),2)}} | Write-Host" % self.hostname
        return self.ps.execute(command)

    # CPU
    def cpu_usage(self):
        # command = "(Get-WmiObject -ComputerName %s -Class win32_processor -ErrorAction Stop -Credential $credential | Measure-Object -Property LoadPercentage -Average | Select-Object Average).Average;" % self.hostname
        command = "(Get-WmiObject -ComputerName {0} -Class win32_processor -ErrorAction Stop -Credential $credential | Measure-Object -Property LoadPercentage -Average | select Average | Write-Host)".format(self.hostname)
        return self.ps.execute(command)

    # UPDATES ?

    # HARDWARE INFO ?
    def hardware_inventory(self):
        # get all properties and values of Win32_ComputerSystem
        # host_name =  {i: getattr(self.conn.Win32_ComputerSystem()[0], i) for i in self.conn.Win32_ComputerSystem.properties}

        # -----------------------HOST-----------------------
        search_class = "Win32_ComputerSystem"
        props = ["Name", "Model", "Manufacturer"]
        host = self.get_values(search_class, props)
        # environment variable
        host[0]['oficina'] = self.conn.Win32_Environment(Name="oficina")[0].VariableValue

        # -----------------------CPU-----------------------
        search_class = "Win32_Processor"
        props = ["Name", "NumberOfCores",
                 "NumberOfLogicalProcessors", "MaxClockSpeed", ]
        cpu = self.get_values(search_class, props)

        # -----------------------RAM-----------------------
        ram = {}
        # ---- RAM CAPACITY
        # converting bytes to GB (Bytes/1024^3)
        ram["Memory"] = round(int(self.conn.Win32_PhysicalMemory()[
                            0].Capacity) / (1024**3),1)
        # ---- RAM SIMS
        ram["N_Sims"] = self.conn.win32_PhysicalMemoryArray()[0].MemoryDevices

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
        drivers = {i: getattr(getattr(self.conn, search_class)()[
                              0], i) for i in props}
        return {
            "drivers": drivers
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
