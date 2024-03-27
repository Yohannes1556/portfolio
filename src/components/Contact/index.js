import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    console.log('Sending email...')

    emailjs
      .sendForm('service_d5ifpnp', 'template_fk4n4fc', form.current, {
        publicKey: '6AOtU_UEMM0QS3kpA',
      })
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text)
        alert('Message successfully sent!')
        window.location.reload(false)
      })
      .catch((error) => {
        console.error('Failed to send email:', error.message)
        alert('Failed to send the message:', error.message)
      })
  }
  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p className="add-size">
            I am interested in freelance opportunities - especially ambitious or
            large projects. However, if you have other request or question,
            don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="send" />
                </li>
              </ul>
            </form>
          </div>
        </div>

        <div className="info-map">
          Yohannes Addisu,
          <br />
          Ethiopia
          <br />
          Addis Ababa, Bole
          <br />
          <span>se.yohannes.addisu@gmail.com</span>
        </div>

        <div className="map-wrap">
          <MapContainer center={[8.9438201, 38.785606]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[8.9438201, 38.785606]}>
              <Popup>Yohannes lives here </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  )
}

export default Contact
