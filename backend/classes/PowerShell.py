import subprocess
import sys
import os


class PowerShell():
    @property
    def credentials(self):
        """
        Return a string that generates the credentials of the user 
        with permissions in the AD to execute the command.
        Should be appended at the start of any command that requires 
        admin permissions.
        The comand should accept the parameter '-Credential'
        """
        credentials = "$password = ConvertTo-SecureString '%s' -AsPlainText -Force;" % os.getenv("LDAP_PASSWORD")
        credentials += "$credential = new-object -typename System.Management.Automation.PSCredential -argumentlist 'PROJECTEJORDI\Administrador',$password;"
        return credentials

    def parse_output(self, not_parsed_output):
        """
        Parses the output of the powershell command into a object
        """
        # removes extra characters and spaces at the beggining and the end of the string
        parsed_output = not_parsed_output.strip().split("\r\n")
        parsed_output = [i.strip() for i in parsed_output]
        if len(parsed_output) == 1:
            parsed_output = parsed_output[0]

        return parsed_output

    def execute(self, command, credentials=True):
        """
        Executes the given command with powershell

        Optional params:
            - credentials: (by default True) If is setted to False, 
            the command won't be able to execute commands that requires 
            admin permissions.
        """
        
        # check if the comand should have the credentials appended
        if credentials:
            command = self.credentials+command+" -Credential $credential"

        # execute command in a new process
        print(command)
        e = subprocess.Popen(
            ['powershell.exe', '-command', command], stdout=subprocess.PIPE)

        # normally the response type will be bytes, then we'll try to decode it, 
        # but not always is bytes
        try:
            output = e.communicate()[0].decode("unicode_escape")
        except UnicodeDecodeError as err:
            output = str(err.args[1])

        return self.parse_output(output)

