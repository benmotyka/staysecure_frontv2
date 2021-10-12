import React from 'react'

import Navbar from 'components/Navbar/Navbar'
import Hero from 'components/Hero/Hero'
import LatestCourses from 'components/PreviewItems/LatestCourses'
import LatestArticles from 'components/PreviewItems/LatestArticles'
import Footer from 'components/Footer/Footer'
import {PageWrapper} from 'components/Pages/Pages.styles'

const home = () => {
    return (
        <>
            <Navbar/>
            <Hero/>
            <PageWrapper>
            <LatestCourses/>
            <LatestArticles/>
            </PageWrapper>
            <Footer/>
        </>
    )
}

export default home
