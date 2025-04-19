import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SceneBuilder = () => {
  const [mainImage, setMainImage] = useState(null);
  const [objectImage, setObjectImage] = useState(null);
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [objects, setObjects] = useState([]);
  const [showAddButtons, setShowAddButtons] = useState(true);
  const [title, setTitle] = useState('');
  const [savedTitle, setSavedTitle] = useState('');

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage(URL.createObjectURL(file));
  };

  const handleObjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setObjectImage(URL.createObjectURL(file));
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAudioFile(URL.createObjectURL(file));
  };

  const addObject = () => {
    if (objectImage && description && audioFile) {
      setObjects([...objects, { url: objectImage, description, audio: audioFile }]);
      setObjectImage(null);
      setDescription('');
      setAudioFile(null);
    }
  };

  const handleSave = () => {
    setShowAddButtons(false);
    setSavedTitle(title);
  };

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const labelStyle = {
    padding: '10px 16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'inline-block',
    marginBottom: '6px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '180px',
  };

  const buttonStyle = {
    padding: '10px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };

  const hiddenInputStyle = {
    display: 'none',
  };

  const tickStyle = {
    marginLeft: '8px',
    fontSize: '20px',
    color: 'green',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: '40px 20px',
        minHeight: '100vh',
        width:'100vw'
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>{savedTitle || 'Create Interactive Scene'}</h2>

        {showAddButtons && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            {/* Title Input */}
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            {/* Main Image Upload */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label htmlFor="main-image-upload" style={labelStyle}>
                Upload Main Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="main-image-upload"
                onChange={handleMainImageUpload}
                style={hiddenInputStyle}
              />
              {mainImage && <span style={tickStyle}>✔️</span>}
            </div>

            {/* Object Upload */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label htmlFor="object-image-upload" style={labelStyle}>
                  Upload Object Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="object-image-upload"
                  onChange={handleObjectImageUpload}
                  style={hiddenInputStyle}
                />
                {objectImage && <span style={tickStyle}>✔️</span>}
              </div>

              <input
                type="text"
                placeholder="Object description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={inputStyle}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label htmlFor="audio-upload" style={labelStyle}>
                  Upload Audio Description
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  id="audio-upload"
                  onChange={handleAudioUpload}
                  style={hiddenInputStyle}
                />
                {audioFile && <span style={tickStyle}>✔️</span>}
              </div>

              <button onClick={addObject} style={buttonStyle}>
                Add Object
              </button>
            </div>

            <button onClick={handleSave} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
              Save
            </button>
          </div>
        )}

        {/* Main Image */}
        {mainImage && (
          <div
            style={{
              width: 400,
              height: 300,
              margin: '40px auto 20px',
              border: '2px solid #ccc',
              borderRadius: 12,
              backgroundImage: `url(${mainImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Objects */}
        <div
          style={{
            marginTop: 30,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 30,
            minHeight: '200px',  // Increased the height of the area
          }}
        >
          {objects.map((obj, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 1.2, y: -15 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => playAudio(obj.audio)}
              style={{
                width: 200,   // Increased width
                height: 250,  // Increased height
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src={obj.url}
                alt={obj.description}
                style={{
                  width: '100%',
                  height: '180px',   // Increased the image height
                  objectFit: 'contain',
                  borderRadius: 8,
                }}
              />
              <div style={{ fontSize: 14, marginTop: '8px' }}>{obj.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SceneBuilder;
