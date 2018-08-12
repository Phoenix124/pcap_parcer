import json
import os

from flask import Flask, request, redirect, url_for, send_from_directory, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from phasortoolbox import PcapParser

UPLOAD_FOLDER = r'C:\Users\Администратор\PycharmProjects\PhasorToolBox\phasortoolbox'
ALLOWED_EXTENSIONS = {'pcap'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    print(request.files)
    # check if the post request has the file part
    if 'file' not in request.files:
        print('no file in request')
        return""
    file = request.files['file']
    if file.filename == '':
        print('no selected file')
        return""
    if file and allowed_file(file.filename):
        print("hello")
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return ""
    print("end")
    return""

@app.route('/getcontentfile/<filename>', methods=['GET'])
def uploaded_file(filename):
    my_pcap_parser = PcapParser()
    msgs = my_pcap_parser.from_pcap(app.config['UPLOAD_FOLDER'] + '\\' + filename)
    if hasattr(msgs[1].data, 'num_pmu'):
        num_pmu = ' num_pmu: ' + str(msgs[1].data.num_pmu) + ','
    else:
        num_pmu = ' num_pmu: ' + str(msgs[2].data.num_pmu) + ','
    data = json.dumps(msgs[100].data.pmu_data[0].phasors, ensure_ascii=False, default=str)
    return jsonify(num_pmu + str(data))

if __name__ == "__main__":
    app.run(host='localhost', port=8080)