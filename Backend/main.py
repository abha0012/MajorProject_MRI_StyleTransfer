# pylint: disable=C0301,C0103
'''Trial code with improved pylint score --> Main code in main.py'''
import os
import pathlib
from werkzeug.utils import secure_filename
from flask import flash, request, redirect, url_for, render_template
from numpy import asarray
from keras.utils import img_to_array, load_img
from matplotlib import pyplot as plt
import tensorflow as tf
from app import app
tf.config.experimental_run_functions_eagerly(True)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    '''To check if the uploaded file extension is in the list'''
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

T1_model = tf.keras.models.load_model('D:\Projects\MajorProject_MRI_StyleTransfer\Backend\T1_model')
T2_model = tf.keras.models.load_model('D:\Projects\MajorProject_MRI_StyleTransfer\Backend\T2_model')
# Setting input image sizes
IMG_HEIGHT = 217
IMG_WIDTH = 181
# Setting default batch size
BATCH_SIZE = 64
# Defining the path for the data
base_dir = pathlib.Path("D:/Projects/MajorProject_MRI_StyleTransfer/Backend/static")
os.chdir(base_dir)
data_dir = pathlib.Path(str(base_dir) + '/uploads/')

def load_image(path, filename, size=(256,256)):
    '''Function to load file from specific folder and filename'''
    data_list = []
    pixels = load_img(path + filename, target_size=size)
    pixels = img_to_array(pixels)
    data_list.append(pixels)
    return asarray(data_list)

# Define normalization function - Normalizing data in the range [-1.0, 1.0]
normalization_layer = tf.keras.layers.experimental.preprocessing.Rescaling(scale = 1./127.5, offset =-1.0)
# Define resizing function
resize_layer = tf.keras.layers.experimental.preprocessing.Resizing(128, 128, interpolation='bilinear')
#Reshape
reshape_layer = tf.keras.layers.Reshape((128,128,1))

def generate_images_T2(model1, test_input1,filename):
    '''Main function for T1 --> T2'''
    prediction1 = model1(test_input1)
    # prediction2 = model2(test_input2)
    plt.figure(figsize=(20, 20))
    display_list = [prediction1[0]]
    # title = ['Predicted T2']
    for i in range(1):
        plt.subplot(1, 1, i+1)
        # plt.title(title[i])
        plt.imshow(display_list[i].numpy()[:, :, 0], cmap='gray')
        plt.axis('off')
    save_results_to = ('D:/Projects/MajorProject_MRI_StyleTransfer/Backend/static/uploads/')
    plt.savefig(save_results_to + 'Result_T2_' + filename,  bbox_inches="tight", transparent="true")
    # plt.show()
    print("\n")
    return'Result_T2_' + filename

def generate_images_T1(model1, test_input1,filename):
    '''Main function for T2-->T1'''
    prediction1 = model1(test_input1)
    # prediction2 = model2(test_input2)
    plt.figure(figsize=(20, 20))
    display_list = [prediction1[0]]
    # title = ['Input T1', 'Predicted T2 ']
    for i in range(1):
        plt.subplot(1, 1, i+1)
        # plt.title(title[i])
        plt.imshow(display_list[i].numpy()[:, :, 0], cmap='gray')
        plt.axis('off')
    save_results_to = ('D:/Projects/MajorProject_MRI_StyleTransfer/Backend/static/uploads/')
    plt.savefig(save_results_to + 'Result_T1_' + filename,  bbox_inches="tight", transparent="true")
    # plt.show()
    print("\n")
    return'Result_T1_' + filename

@app.route('/')
def upload_form():
    '''Route to original landing/home page'''
    return render_template('upload.html')

@app.route('/mri', methods=['POST'])
def upload_image():
    '''Route when image is uploaded, and user is expecting for result'''
    if 'files' not in request.files:
        flash('No file part')
        return "No file part"
    file = request.files['files']
    if file.filename == '':
        flash('No image selected for uploading')
        return "No image selected for uploading"
    if file and allowed_file(file.filename):
        model = request.form.get('model')
        print('model:',model)
        filename = secure_filename(file.filename)
        print("File present, name: ", filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_0 = load_image("D:/Projects/MajorProject_MRI_StyleTransfer/Backend/static/uploads/", filename)
        #Normalizing the loaded file
        images_norm = normalization_layer(file_0)
        # Resizing the normalized data
        images_resized =resize_layer(images_norm)
        #Reshape the resized data
        images_reshaped = reshape_layer(images_resized[:,:,:,0])
        if(model=='T2'):
            a = generate_images_T2(T2_model, images_reshaped, filename)
            print(a)
            path_a = 'D:/Projects/MajorProject_MRI_StyleTransfer/Backend/static/uploads/' + a
            flash('Image successfully uploaded and displayed below...')
            return a,path_a
        if(model=='T1'):
            a = generate_images_T1(T1_model, images_reshaped, filename)
            print(a)
            path_a = 'D:/Projects/MajorProject_MRI_StyleTransfer/Backend/static/uploads/' + a
            flash('Image successfully uploaded and displayed below...')
            return a,path_a
        
        # return render_template('upload.html', filename=a, path = path_a)
    flash('Allowed image types are -> png, jpg, jpeg, gif')
    return "Lol"

@app.route('/display/<filename>')
def display_image(filename, path):
    '''Displays images on frontend'''
    print('display_image filename: ' + filename)
    return redirect(url_for('static', filename='uploads/' + filename), path, code=301)

if __name__ == "__main__":
    app.run()
