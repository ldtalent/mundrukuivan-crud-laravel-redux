import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class ProfileView extends Component{


    render(){

        return (

            <div className="profile">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-6">
                      <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                    </div>
                    <div className="col-6">
        
                    </div>
                  </div>
        
     
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                          <div className="col-4 col-md-3 m-auto">
                            <img className="rounded-circle" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h1 className="display-4 text-center">John Doe</h1>
                          <p className="lead text-center">Developer at Microsoft</p>
                          <p>Seattle, WA</p>
                          <p>
                            <a className="text-white p-2" href="#">
                              <i className="fas fa-globe fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-twitter fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-facebook fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                            <a className="text-white p-2" href="#">
                              <i className="fab fa-instagram fa-2x"></i>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
        
         
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-light mb-3">
                        <h3 className="text-center text-info">Johns Bio</h3>
                        <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident fuga cum necessitatibus blanditiis vel,
                          officia facere porro esse numquam assumenda doloremque saepe aliquam nemo excepturi aliquid maiores! Excepturi,
                          libero repudiandae.
                        </p>
                        <hr />
                        <h3 className="text-center text-info">Skill Set</h3>
                        <div className="row">
                          <div className="d-flex flex-wrap justify-content-center align-items-center">
                            <div className="p-3">
                              <i className="fa fa-check"></i> HTML</div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> CSS</div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> JavaScript</div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> Python</div>
                            <div className="p-3">
                              <i className="fa fa-check"></i> C#</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        
                
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="text-center text-info">Experience</h3>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <h4>Microsoft</h4>
                          <p>Oct 2011 - Current</p>
                          <p>
                            <strong>Position:</strong> Senior Developer
                          </p>
                          <p>
                            <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde doloribus dicta enim
                            excepturi laborum voluptatem nam provident quisquam facere. Quae?</p>
                        </li>
                        <li className="list-group-item">
                          <h4>Sun Microsystems</h4>
                          <p>Oct 2004 - Nov 2011</p>
                          <p>
                            <strong>Position: </strong> Systems Admin</p>
                          <p>
                            <p>
                              <strong>Location: </strong> Miami, FL
                            </p>
                            <strong>Description: </strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde doloribus dicta
                            enim excepturi laborum voluptatem nam provident quisquam facere. Quae?</p>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h3 className="text-center text-info">Education</h3>
                      <ul className="list-group">
                       
                      </ul>
                    </div>
                  </div>
        
              
                  <div >
                    <hr />
                    <h3 className="mb-4">Latest Github Repos</h3>
                    <div key='1' className="card card-body mb-2">
                      <div className="row">
                        <div className="col-md-6">
                          <h4>
                            <Link to='22' className="text-info" target="_blank"> Repository One
                            </Link>
                          </h4>
                          <p>Repository description</p>
                        </div>
                        <div className="col-md-6">
                          <span className="badge badge-info mr-1">
                            Stars: 44
                          </span>
                          <span className="badge badge-secondary mr-1">
                            Watchers: 21
                          </span>
                          <span className="badge badge-success">
                            Forks: 122
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
         
           
        )
    }
}

export default ProfileView;