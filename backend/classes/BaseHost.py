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
        host = {i: getattr(getattr(self.conn, search_class)()[0], i) for i in props}
        # custom operation
        host['ram'] = int(self.conn.Win32_ComputerSystem()[0].TotalPhysicalMemory) / (1024**3)
        
        # -----------------------BIOS-----------------------
        search_class = "Win32_BIOS"
        bios = {
            "name": self.conn.Win32_BIOS()[0].Manufacturer,
            "version": self.conn.Win32_BIOS()[0].Version
        }

        # -----------------------DISPLAY-----------------------
        search_class = "Win32_DisplayConfiguration"
        props = ["DeviceName", "DisplayFrequency",
                 "PelsHeight", "PelsWidth", "BitsPerPel"]
        display = {i: getattr(getattr(self.conn, search_class)()[0], i) for i in props}
        
        # -----------------------PRINTERS-----------------------
        search_class = "Win32_Printer"
        props = ["Name", "Default", "Network", "PortName",
                 "DriverName", "ServerName", "ShareName"]
        printer = {i: getattr(getattr(self.conn, search_class)()[0], i) for i in props}

        return {
            "host": host,
            "bios": bios,
            "display": display,
            "printer": printer,
        }

    # SOFTWARE INFO ?
    def software_inventory(self):
        # -----------------------DRIVERS-----------------------
        search_class = "Win32_PnPSignedDriver"
        props = ["DeviceName", "Manufacturer", "DriverVersion"]
        drivers = {i: getattr(getattr(self.conn, search_class)()[0], i) for i in props}
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
