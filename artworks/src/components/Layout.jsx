import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({children}) {
  return (
    <main className='main-container'>
      <Header />
        <section className='content-wrapper'>
            {children}
        </section>
      <Footer />
    </main>
  )
}

export default Layout