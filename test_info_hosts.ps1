$password = ConvertTo-SecureString "xxxx" -AsPlainText -Force
$credential = new-object -typename System.Management.Automation.PSCredential -argumentlist "PROJECTEJORDI\Administrador",$password

# CPU USAGE
(Get-WmiObject -ComputerName 192.168.1.150 -Class win32_processor -ErrorAction Stop -Credential $credential | Measure-Object -Property LoadPercentage -Average | Select-Object Average).Average

# RAM
$ComputerMemory = Get-WmiObject -Credential $credential -ComputerName 192.168.1.150 -Class win32_operatingsystem -ErrorAction Stop
$Memory = ((($ComputerMemory.TotalVisibleMemorySize - $ComputerMemory.FreePhysicalMemory)*100)/ $ComputerMemory.TotalVisibleMemorySize)
[math]::Round($Memory, 2)