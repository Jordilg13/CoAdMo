import datetime


def ad_timestamp(timest):
    """
    Convert the format of the active directory returned dates to a Date
    """
    if timest != 0 and timest != 9223372036854775807:  # if never expires
        return (datetime.datetime(1601, 1, 1) + datetime.timedelta(seconds=timest/10000000)).timestamp()
    return 0


def format_data(users):
    """
    Format the data removing extra and unecessary arrays
    """
    users = [i[1] for i in users]
    users = [i for i in users if isinstance(i, dict)]
    for i in users:
        for j in i:
            i[j] = i[j][0].decode("utf-8")
    return users


def set_flags(users, expiration_time):
    """
    Set flags to users. 
    Marks are 'isExpired' and 'isBlocked'
    """
    for i in users:
        # BLOCKED USERS ------
        try:
            if i['lockoutTime'] != "0":
                i['isBlocked'] = True
        except:
            pass

        # USERS WITH EXPIRED PASSWORDS ------
        # convert teh date from the format of the active directory to a normal date
        i['pwdLastSet'] = ad_timestamp(int(i['pwdLastSet']))

        # sets the expiration date and the date of rigth now
        exp_date = i['pwdLastSet'] + expiration_time
        today = datetime.datetime.today().timestamp()

        # check if the user's password is expired
        if i['pwdLastSet'] != 0 and i['userAccountControl'] != "66048" and today > exp_date:
            i['isExpired'] = True

        if i['userAccountControl'] == '514':
            i['isDisabled'] = True
    return users
