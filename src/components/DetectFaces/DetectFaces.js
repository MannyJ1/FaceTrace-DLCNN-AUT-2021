import React, { Component, useState, useEffect } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "../DetectFaces/DetectFaces.css";
import Database from "../Database/Database"
import firebase from "../../config/firebase"


var db = firebase.firestore();

const DetectFaces = () => {

  const [recentUpload, setUpload] = useState([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    db.collection("recentUpload").get().then((querySnapshot) => {
      recentUpload.length = 0;
      querySnapshot.forEach((doc) => {
        setUpload(oldArray => [...oldArray, doc.data()]);
      });
    });
  }, []);

  function getPathToImage() {
    var name1 = "RecentImage"
    var Name = name1.replace(/\s/g, '');
    setName(name1);
    return Name;
  }

  function addToDatabase() {
    var path = getPathToImage();
    var myObj = {
      image: imageSrc,
      identifier: getPathToImage()
    }

    db.collection("recentUpload").doc(path).set(
      myObj
    ).then(() => {
      console.log("Document successfully written!");
      setUpload(oldArray => [...oldArray, myObj]);
    }).catch((error) => {
      console.warn(error);
    });

    const timer = setTimeout(() => {
      detectFacesWindowRefresh();
        }, 200)  
      return () => clearTimeout(timer);
  }

  function detectFacesWindowRefresh(){
    window.location.href="/Detect"
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
    <>
      <div className="maindiv">
        <h1 className="temp">Detect Faces!</h1>
        <p>Upload an image containing known faces to perform a prediction!</p>
        <br></br>
        <div>{
          recentUpload.map((image) => (

            <Database image={image}/>
          ))
          }
        </div>
        <br></br>
        <div className="mainContent">
          <div className="inputfields">
            <div>
              <input
                type="file"
                id="imageField"
                accept="image/*"
                className="image-input"
                onChange={(e) => captureFile(e)}
              />
            </div>
            <br />
            <AwesomeButton onPress={() => {
              addToDatabase();
            }}
              type="secondary"
              style={myButtonStyle}>Detect faces within this image</AwesomeButton>
              <br></br>
              <AwesomeButton onPress={() => {
              window.location.href="/Upload"
            }}
              type="secondary"
              style={myButtonStyle}>Upload another face</AwesomeButton>
          </div>
        </div>
      </div>
    </>
  );
}

const myButtonStyle = {
  width: "16vw",
  height: "4vh",
  fontSize: "50%",
};

export default DetectFaces;