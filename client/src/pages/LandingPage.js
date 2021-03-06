import { Fragment } from 'react'
import Header from '../components/landingPageComponents/Header'
import Section from '../UI/Section'

import tvPic from '../images/tv.png'
import phonePic from '../images/phone.jpg'
import mediaPic from '../images/media.png'
import kidsPic from '../images/kids.png'


const sectionData = [{ text1: "Enjoy on your TV.", text2: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.", img: tvPic },
{ text1: "Download your shows to watch offline.", text2: "Save your favorites easily and always have something to watch.", img: phonePic },
{ text1: "Watch everywhere.", text2: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.", img: mediaPic },
{ text1: "Create profiles for kids.", text2: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.", img: kidsPic }]

const LandingPage = () => {
    return <Fragment>
        <Header />
        {sectionData.map((section, i) => {
            return <Section key={i}>
            <div>
                <h2>{section.text1}</h2>
                <p>{section.text2}</p>
            </div>
            <img src={section.img} />
        </Section>
        })}
    </Fragment>
}

export default LandingPage