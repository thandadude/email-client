import os
import json
from tinydb import TinyDB
from tinydb import Query, where

db_folder = os.path.join(os.path.dirname(__file__))
db_file = os.path.join(db_folder, 'data', 'mails.json')
the_db = TinyDB(db_file)


def get_all_accounts():    
    print("getting tables")
    table = the_db.table('accounts')
    return table.all()

def delete_mail(deleteIDs):
    print("deleting mails from tables")
    #table = the_db.table('accounts')
    for item in deleteIDs:
        print(item) #delete implementation pending...

def add_mail(mailData):
    print("Inserting data...")
    try:
        data = json.loads(mailData) #validate json.
        table = the_db.table('accounts')    #get accounts table.
        queryData = table.get(Query()['address'] == data['sender email'])    #get our mail address account.
        queryData = str(queryData).replace("'", '"')    #tinyDB compains about "", TODO: rethink why we need it!

        jsonData = json.loads(queryData)
        jsonData["mail"].append(data)   #add out data. optimize to parse and access the document in tinyDB.
        res = table.update({ "mail":  jsonData["mail"] } , eids=[1])    #update the mail chain for that account.
        print(res)  #print result of our operation.
    except ValueError as e:
        print("invalid json: %s" % e)
        raise Exception(e)
    except Exception as e:
        print(str(e))
        raise Exception(e)

def read_receipt(mailID):
    table = the_db.table('accounts')
    res = table.insert(mailID)
    print("Inserted post: {} <-- {}".format(res, mailID))


def json_validator(data):
    try:
        json.loads(data)
        return True
    except ValueError as error:
        print("invalid json: %s" % error)
        return False

