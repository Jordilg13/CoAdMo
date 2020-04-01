from classes.BaseHost import BaseHost


class ActiveDirectory(BaseHost):
    def __init__(self, hostname):
        super().__init__(hostname)

    ##### MONITORING #####
    def get_users_by_filter(self, parameter):
        command = "Search-ADAccount -Account{0} -Credential $credential | select samaccountname | ft -HideTableHeaders".format(parameter)

        return self.ps.execute(command) 

    ##### INTERACTION #####
