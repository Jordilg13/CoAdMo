from pythonping import ping
import os
from classes.Powershell import PowerShell


class BaseHost():
    def __init__(self, hostname):
        self.hostname = hostname
        self.ps = PowerShell()
        self.status = self.is_up()

    ##### MONITORING #####

    # PING
    def is_up(self):
        try:
            response = ping(self.hostname, count=2).success()
        except:
            response = -1

        return response

    # SPACE
    @property
    def space_available(self):
        command = "Get-WmiObject win32_logicaldisk -Credential $credential -ComputerName %s -Filter 'DriveType=3' | ft @{Expression={($_.FreeSpace*100)/$_.Size -as [int]}} -HideTableHeaders" % self.hostname
        return self.ps.execute(command)

    # RAM
    @property
    def ram_usage(self):
        command = "$ComputerMemory = Get-WmiObject -Credential $credential -ComputerName %s -Class win32_operatingsystem -ErrorAction Stop;$Memory = ((($ComputerMemory.TotalVisibleMemorySize - $ComputerMemory.FreePhysicalMemory)*100)/ $ComputerMemory.TotalVisibleMemorySize);[math]::Round($Memory, 2)" % self.hostname
        return self.ps.execute(command)

    # CPU
    @property
    def cpu_usage(self):
        command = "(Get-WmiObject -ComputerName %s -Class win32_processor -ErrorAction Stop -Credential $credential | Measure-Object -Property LoadPercentage -Average | Select-Object Average).Average;" % self.hostname
        return self.ps.execute(command)

    # UPDATES ?

    # HARDWARE INFO ?

    # SOFTWARE INFO ?

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
