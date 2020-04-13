from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

import os
import db
import json
#import gpxpy.gpx

# Set the template and static folder to the client build
app = Flask(__name__, template_folder="client/build", static_folder="client/build/static")
CORS(app)

app.config['SECRET_KEY'] = 'super secret key'
app.config['SITE'] = "http://localhost:8000/"
app.config['DEBUG'] = True
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    """ This is a catch all that is required for react-router """
    return render_template('index.html')


@app.route('/getMails', methods=['GET'])
def getMail():
    """ An example get request to send all mail data stored in static file location. """
    try:
        if request.method == 'GET':
            data = json.loads('{ "accounts" : [] }')
            data['accounts'] = db.get_all_accounts()
            return jsonify(status=200, text=json.dumps(data))   #send all accounts
    except Exception as e:
        return jsonify(status=500, text=str(e))
    

@app.route('/deleteMail', methods=['DELETE'])
def deleteMail():
    """ An example get request to delete mail data stored in static file location. """
    if request.method == 'DELETE':
        try:
            print(request.data) #a@abc.com1575474762.689671b@abc.com
            data = json.loads(request.data)
            db.delete_mail(data['delete'])
            return jsonify(status=200, text="success")
        except Exception as e:
            return jsonify(status=500, text=str(e))

#setup options header for pre-flight response.
@app.route('/deleteMail', methods=['OPTIONS'])
def options():
    #setup options header for pre-flight response.
    print("Responding for Options")
    response = app.make_response("")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


#setup options header for pre-flight response.
@app.route('/markRead', methods=['OPTIONS'])
def read_options():
    #setup options header for pre-flight response.
    print("Responding for Options")
    response = app.make_response("")
    #response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

@app.route('/markRead', methods=['POST'])
def markRead():
    """ An example get request to mark mail data as read. """
    if request.method == 'POST':
        try:
            print(request.path) #a@abc.com1575474762.689671b@abc.com
            #data = json.loads(request.data)
            #db.update_mail(data['delete'])
            return jsonify(status=200, text="success")
        except Exception as e:
            return jsonify(status=500, text=str(e))



@app.route('/sendMail', methods=['POST'])
def sendMail():
    """ An example send mail data and store in static file location. basically we're gonna read the blob of data, append it at the end of our json file. """
    if request.method == 'POST':
        try:
            print(request.data)
            db.add_mail(request.data)
            return jsonify(status=200, text="success")
        except Exception as e:
            return jsonify(status=500, text=str(e))


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='localhost', port=port)
