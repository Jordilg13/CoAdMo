import wmi
c = wmi.WMI("192.168.1.150", user=r"Administrador", password="xxxxx")
print(c.Win32_ComputerSystem()[0].Name)
print(c.Win32_ComputerSystem()[0].TotalPhysicalMemory)
print(c.Win32_ComputerSystem()[0].Model)
print(c.Win32_ComputerSystem()[0].Manufacturer)



# print(((int(c.Win32_OperatingSystem()[0].TotalVisibleMemorySize) -int(c.Win32_OperatingSystem()[0].FreePhysicalMemory))*100)/(int(c.Win32_OperatingSystem()[0].TotalVisibleMemorySize)))