import React, { Component, useState, useEffect } from "react";
import DeleteBTN from "../../assets/cross-btn.png"
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./StartTracing.css";
import firebase from "../../config/firebase.js"

var db = firebase.firestore();
const StartTracing = () => {

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [identifier, setID] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    db.collection("images").get().then((querySnapshot) => {
      images.length = 0;
      querySnapshot.forEach((doc) => {
        setImages(oldArray => [...oldArray, doc.data()]);
      });
    });
  }, []);

  function getPathToImage() {
    var name1 = document.getElementById("nameField").value;
    var target1 = document.getElementById("tagField").value;
    var Name = name1.replace(/\s/g, '');
    var target = target1.replace(/\s/g, '');
    setName(name1);
    setTarget(target1);
    return Name + "____" + target;
  }

  function addToDatabase() {
    var path = getPathToImage();
    var myObj = {
      image: imageSrc,
      name: document.getElementById("nameField").value,
      target: document.getElementById("tagField").value,
      identifier: getPathToImage().toString()
    }

    db.collection("images").doc(path).set(
      myObj
    ).then(() => {
      console.log("Document successfully written!");
      console.log(getPathToImage().toString())
      setImages(oldArray => [...oldArray, myObj]);
    }).catch((error) => {
      console.warn(error);
    });
  }

  function  deleteUploadedImage(image){
    db.collection("images").doc(image.identifier).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
    const timer = setTimeout(() => {
      uploadWindowRefresh();
        }, 200)  
      return () => clearTimeout(timer);
  }

  function uploadWindowRefresh(){
    window.location.href="/Upload"
  }

  function captureFile(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
    }
  }

  return (
    <div>
      <div className="background">
      <div className="upload-image-lbl"><p>Upload an image!</p></div>
      <div className="upload1-image-lbl"><p>Existing images:</p></div>
              <div className="existing-image-lbl">
              </div>
              <div className="image-stack"> {
              images.map(image => (
                <div className="face-card">
                  <img className="face-card-img" src={image.image} />
                    <button onClick={() => {
                    deleteUploadedImage(image);}} className="delete-image-btn"><img src={DeleteBTN} width="35px"/></button>
                  <div className="face-card-img-lbl">
                    <p> {image.name + ":"} </p>
                  </div>
                  <div className="face-card-lbl">
                    <p> {image.target} </p>
                  </div>
                </div>
              ))
              } </div>
          <div className="inputfields">
            <br />
            <div>
              <br></br>
              <label>Select an image: </label>
              <div>
              <input
                type="file"
                className="image-input"
                id="imageField"
                accept="image/*"
                onChange={(e) => captureFile(e)}
              />
            </div>
            </div>
            <br></br>
            <label>Name: </label>
            <div>
              <input
                className="image-input"
                id="nameField"
                type="text"
                placeholder="Enter the person's full name"
              />
            </div>
            <br />
            <label>Enter a Tag: </label>
            <div>
              <input
                className="image-input"
                id="tagField"
                type="text"
                placeholder="Eg. Resident or Criminal"
              />
            </div>
            <br />
            <AwesomeButton onPress={() => {
              addToDatabase();
            }}
              type="primary"
              >1. Upload image</AwesomeButton>
              <AwesomeButton onPress={() => {
              window.location.href="/Detect"
            }}
              type="secondary"
              >2. Detect faces </AwesomeButton>
          </div>
        </div>
        </div>
  );
}
export default StartTracing;