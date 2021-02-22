import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class AddEducation extends Component{


    render(){

        return (
            <div className="add-education">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <Link to="/dashboard" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-4 text-center">Add Your Education</h1>
          <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
          <small className="d-block pb-3">* = required field</small>
          <form action="login.html">
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="* School Or Bootcamp" name="school" required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="* Degree Or Certificate" name="degree" required />
            </div>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" placeholder="Field Of Study" name="fieldofstudy" />
            </div>
            <h6>From Date</h6>
            <div className="form-group">
              <input type="date" className="form-control form-control-lg" name="from" />
            </div>
            <h6>To Date</h6>
            <div className="form-group">
              <input type="date" className="form-control form-control-lg" name="to" />
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" name="current" value="" id="current" />
              <label className="form-check-label" forHtml="current">
                Current Job
              </label>
            </div>
            <div className="form-group">
              <textarea className="form-control form-control-lg" placeholder="Program Description" name="description"></textarea>
              <small className="form-text text-muted">Tell us about your experience and what you learned</small>
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
        )
    }
}

export default AddEducation;