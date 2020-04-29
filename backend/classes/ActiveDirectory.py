from classes.BaseHost import BaseHost
from classes.PowerShell import PowerShell
import ldap.modlist as modlist
import ldap
import sys
import os
import datetime

# GET computers from AD
# Get-ADComputer -Filter * -SearchBase "DC=projectejordi,DC=es" -Credential $credential -Properties *


class ActiveDirectory():
    def __init__(self):
        # super().__init__(self, os.getenv("LDAP_IP"))
        self.conn = self.setup()
        self.base = os.getenv("DOMAIN")
        self.scope = ldap.SCOPE_SUBTREE
        self.PASSWORD_EXPIRATION_DATE = datetime.timedelta(days=45)

    def setup(self):
        # GETTING VARIABLES
        # server = "ldaps://{}:636".format(os.getenv("LDAP_IP"))
        server = os.getenv("LDAP_HOST")
        DN = os.getenv("LDAP_BIND_DN")
        password = os.getenv("LDAP_PASSWORD")

        # SETTING UP THE CONNECTION
        ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)
        l = ldap.initialize(server)
        l.protocol_version = 3
        l.set_option(ldap.OPT_REFERRALS, 0)
        l.set_option(ldap.OPT_X_TLS, ldap.OPT_X_TLS_DEMAND)
        l.set_option(ldap.OPT_X_TLS_DEMAND, True)
        l.simple_bind_s(DN, password)

        return l

    ##### MONITORING #####
    # def get_users_by_filter(self, parameter):
    #     command = "Search-ADAccount -{0} -Credential $credential | select samaccountname | ft -HideTableHeaders".format(parameter)

    #     return self.ps.execute(command)

    def search(self, ldap_filter, attrs):
        """
        Executes a query against the ldap server with the input parameters.
        INPUT:
        - ldap_filter: the query string -> "(&(objectClass=user))"
        - attrs: the attributes that will return the query -> ["sammaccountname"]
        """
        l_filter = ldap_filter
        attrs = attrs
        result = self.conn.search(self.base, self.scope, l_filter, attrs)
        typee, users = self.conn.result(result, 60)

        return users

    def modify(self, dn, attrs):
        '''
        Modify a parameter of a object(user, group...)
        '''
        ldif = [tuple((ldap.MOD_REPLACE, key, bytes(value, "utf-8")))
                for (key, value) in attrs.items()]

        result = self.conn.modify_ext(
            dn,
            ldif
        )

        return result

    def create_user(self, username, data):
        '''
        Creates a new user with the recieved data
        '''
        conn = PowerShell()
        command = "New-ADUser -Name '{}' -GivenName '{}' -Surname '{}' -SamAccountName '{}' -UserPrincipalName '{}' -Path '{}' -AccountPassword (ConvertTo-SecureString '{}' -AsPlainText -force) -Enabled $true".format(
            data['name'],
            data['givenName'],
            data['Surname'],
            data['sAMAccountName'],
            data['userPrincipalName'],
            self.base,
            data['Password']
        )
        return conn.execute(command)

    def deleteUser(self, cn):
        """
        Delete the given user
        """
        self.conn.delete_s(cn)

    ##### INTERACTION #####
