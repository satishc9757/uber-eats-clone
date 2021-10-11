import React from 'react'

const Home = () => {
    return (
        <div>
            <nav class="sb-topnav navbar navbar-expand ">
                <a class="navbar-brand ps-3" href="./home"><img src="https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/Uber_Eats_2020_logo.png" alt="Uber Eats logo"/></a>
            
            </nav>
            <header class="masthead">
                <div class="container text-justify">
                    <div class="row">
                        <div class="col-md-2">
                            <a class="btn btn-uber" href="/login">Customer Login</a>
                        </div>
                        <div class="col-md-2">
                            <a class="btn btn-uber" href="/login">Customer Signup</a>
                        </div>

                    </div>
                    <br/>
                    <br/>
                    <div class="row">
                        <div class="col-md-2">
                        <a class="btn btn-uber" href="/res/login">Restaurant Login</a>
                        </div>
                        <div class="col-md-2">
                            <a class="btn btn-uber" href="/res/signup">Restaurant Signup</a>
                        </div>

                    </div>
                    
                </div>
            </header>

            <footer class="footer py-4 home-footer ">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-start">Copyright &copy; Uber Eats 2021</div>
                    <div class="col-lg-4 my-3 my-lg-0">
                        
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <p>Privacy Policy  | Terms of Use</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    )
}

export default Home;
