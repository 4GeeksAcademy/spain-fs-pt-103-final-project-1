"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, redirect
from api.models import db, User, Cat, Sponsor, PaymentRegistration
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy import select, exc
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
import stripe
import os




ph = PasswordHasher()

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods= ['POST'])
def create_user():
    body = request.get_json()

    required_fields = ['email', 'password', 'name', 'lastname', 'birthdate']    
    if not all(field in body for field in required_fields):
        return jsonify({'err': 'Bad request, missing fields'}), 400
    
    search_exist = select(User).where(User.email == body['email'])
    alredy_exist = db.session.execute(search_exist).scalar_one_or_none()

    if(alredy_exist):
        return jsonify({"error": "User already exist"}),401
    
    try:
        hashed_password = ph.hash(body['password'])
    except Exception as e:
        return jsonify({'error': 'Failed to hash password'}), 500
   
   


    user = User()
    user.email = body['email']
    user.password = hashed_password
    user.name = body['name']
    user.lastname = body['lastname']
    user.birthdate = body['birthdate']
    db.session.add(user)
    db.session.commit()

    return jsonify({'Ok': "User created"}),200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if 'email' not in body or 'password' not in body:
        return jsonify({'err':'Bad request'}), 400
    
    email = body['email']
    password = body['password']
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"err": " User not exist"}),404
    

    try:
        ph.verify(user.password, password)
    except VerifyMismatchError:
        return jsonify({'err': 'Invalid password'}), 401
    except Exception:
        return jsonify({'err': 'Error verifying password'}), 500
    
    token = create_access_token(identity=str(user.id))

    return jsonify({'token': token}),200

@api.route('/user/user-data', methods=['GET'])
@jwt_required()
def user_data():
    current_user_id= get_jwt_identity()

    user = db.session.get(User,int(current_user_id))
    if user is None:
        return jsonify({"err": "User not exist"}),400
    user = user.serialize()
    return jsonify({"user":user}),200

@api.route('/user', methods= ['GET'])
def get_all_user():
    all_users = db.session.execute(select(User)).scalars().all()
    all_users = list(map(lambda user: user.serialize(), all_users))   
    
    response_body ={
        "Users" : all_users
    }

    return jsonify(response_body),200

@api.route('/user/<int:user_id>', methods =['GET'])
def get_user_for_id(user_id):
    user = db.session.get(User, user_id)
    if user is None:
        return jsonify({'err': "User not found"}), 404
    response_body={
        "User": user.serialize()
    }
    return jsonify(response_body),200

@api. route('/cat', methods = ['POST'])
def create_cat():
    body = request.get_json()

    if 'name' not in body or 'age' not in body  or  "race" not in body or  "castration" not in body or  "character" not in body:
        return  jsonify({'err': 'Bad request'}),400
    
    search_exist = select(Cat).where(Cat.name == body['name'])
    alredy_exist = db.session.execute(search_exist).scalar_one_or_none()

    if alredy_exist:
     return jsonify({'err': 'The cat already exists'}), 409
    
    cat = Cat()
    cat.name = body['name']
    cat.age = body['age']
    cat.race = body['race']
    cat.castration = body['castration']
    cat.character = body['character']
    db.session.add(cat)
    db.session.commit()

    return jsonify({'ok': 'Cat added'}),201

@api.route('/cat', methods = ['GET'])
def get_all_cat():

   all_cats = db.session.execute(select(Cat)).scalars().all()
   all_cats = list(map(lambda cat: cat.serialize(), all_cats))   
    
   response_body ={
        "Cats" : all_cats
    }

   return jsonify(response_body),200

@api.route('/cat/<int:cat_id>', methods =['GET'])
def get_cat_for_id(cat_id):
    cat = db.session.get(Cat, cat_id)
    if cat is None:
        return jsonify({'err': "Cat not found"}), 404
    response_body={
        "Cat": cat.serialize()
    }
    return jsonify(response_body),200

@api.route('/sponsor', methods = ['POST'])
def create_sponsor():
    body = request.get_json()

    if "user_id" not in body or "cat_id" not in body:
        return ({"err": 'Bad request'}),400
    
    sponsor = Sponsor()
    sponsor.user_id = body['user_id']
    sponsor.cat_id = body['cat_id']
    db.session.add(sponsor)
    db.session.commit()
    
    return jsonify({'ok': "sponsor add"}),201

@api.route('/sponsor', methods =['GET'])
def get_all_sponsor():
    all_sponsor= db.session.execute(select(Sponsor)).scalars().all()
    all_sponsor = list(map(lambda sponsor: sponsor.serialize(), all_sponsor))   
    
    response_body ={
        "Sponsor" : all_sponsor
    }

    return jsonify(response_body),200


@api.route('/payment-registration', methods = ['POST'])
def create_payment():
    body = request.get_json()

    if "sponsor_id" not in body or "amount" not in body or "date_payment" not in body:
        return jsonify({'err':'Bad request'}),400
    
    payment = PaymentRegistration()
    payment.sponsor_id = body['sponsor_id']
    payment.amount = body['amount']
    payment.date_payment = body['date_payment']
    db.session.add(payment)
    db.session.commit()

    return jsonify({'ok': 'Payment register'})


@api.route('/payment-registration', methods =['GET'])
def payment_with_sponsor():
    all_payments= db.session.execute(select(PaymentRegistration)).scalars().all()
   
    results=[]
    for payment in all_payments:
        sponsor = payment.sponsor  
        results.append({
            'id': payment.id,
            'amount': payment.amount,
            'date_payment': str(payment.date_payment),
            'sponsor': {
                'id': sponsor.id,
                'cat_id': sponsor.cat_id,
                'user_id' : sponsor.user_id
            }
        })

    return jsonify({"payments": results}), 200

@api.route('/cat/<int:cat_id>', methods = ['DELETE'])
def handle_delete_cat(cat_id):
    cat = db.session.get(Cat,cat_id)
  
    if cat is None:
     return jsonify({"error": "Cat not found"}), 404
   
    try:
        db.session.delete(cat)
        db.session.commit()
        return jsonify({"message": "Cat deleted"}), 200
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Cannot delete Cat: it is referenced by other records"})


@api.route('/user/<int:user_id>', methods = ['DELETE'])
def handle_delete_user(user_id):
    user = db.session.get(User,user_id)
  
    if user is None:
     return jsonify({"error": "User not found"}), 404
    
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"}),200
    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({"error": "cannot delete User: It`s reference by other records"})
    

stripe.api_key = 'sk_test_51RahuCFMs8PtSpw5R8ZDgpeE3cGPxARTavpjBSoP2YJJGvyYEUOEHF9J0QgrbVQHyTv9K86mZETEuKJHZODPQOuT00mb5wz0An'



    
@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
       data = request.json
       intent = stripe.PaymentIntent.create(
           amount = data['amount'],
           currency = data['currency'],
           automatic_payment_methods={'enabled': True
           }
       )
       return jsonify({
           'clientSecret': intent['client_secret']
       })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

   
