from classes.BaseHost import BaseHost

# GET computers from AD
# Get-ADComputer -Filter * -SearchBase "DC=projectejordi,DC=es" -Credential $credential -Properties *


class ActiveDirectory(BaseHost):
    def __init__(self, hostname):
        super().__init__(hostname)

    ##### MONITORING #####
    def get_users_by_filter(self, parameter):
        command = "Search-ADAccount -{0} -Credential $credential | select samaccountname | ft -HideTableHeaders".format(parameter)

        return self.ps.execute(command) 

    ##### INTERACTION #####
