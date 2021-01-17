import React, { Component } from 'react';
import axios from 'axios';
import Card from './card'

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            years: [],
            successfullLaunch: [],
            launchYear: '',
            isLaunchSuccess: ''

        }
    }

    componentDidMount() {
        axios.get(`https://api.spaceXdata.com/v3/launches?limit=100`)
            .then(res => {
                this.setState({ arr: res.data });
                const yearArr = [...new Set(this.state.arr.map(x => x.launch_year))]
                this.setState({ years: yearArr })
                const successfullLaunch = [...new Set(this.state.arr.map(x => x.launch_success))]
                this.setState({ successfullLaunch: successfullLaunch })
            })
    }
    componentDidUpdate(prevState) {
        if (prevState.launchYear !== this.state.launchYear || prevState.isLaunchSuccess !== this.state.isLaunchSuccess) {
            const url = `https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${this.state.launchYear}&launch_success=${this.state.isLaunchSuccess}`
            axios.get(url)
                .then(res => {
                    this.setState({ arr: res.data })
                })
        }
    }
    setLaunchYear(year) {
        this.setState({ launchYear: year })
    }
    setisLaunchSuccess (isLaunchSuccess)  {
        this.setState({ isLaunchSuccess: isLaunchSuccess })
    }

    render() {
        return (
            <div className="head">
                <h2 className="ml-3">SpaceX Launch Programs</h2>
                <div className="d-md-flex d-block">
                    <div className="col-lg-2 col-md-4 col-12">
                        <div className="sidenav p-2">
                            <h3>filters</h3>
                            <div>
                                <p className="text-center mb-1 borderBottom">Launch Years</p>
                                {this.state.years.map(year => <button className="btn btn-success offset-1 col-4 col-lg-10 col-xl-4 my-2" onClick={() => this.setLaunchYear(year)}>{year}</button>)}
                            </div>
                            <div>
                                <p className="text-center mt-3 mb-1 borderBottom">Successfull Launch</p>
                                {this.state.successfullLaunch.map(val => <button className="btn btn-success offset-1 col-lg-10 col-xl-4 col-4 my-2" onClick={() => this.setisLaunchSuccess(val)}>{val.toString()}</button>)}

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-8 col-12 d-flex row p-0 mx-auto ">
                        {this.state.arr.length ? this.state.arr && this.state.arr.map(data => <div className="cardWidth my-3 text-center">
                            <Card data={data} />
                        </div>) :
                            <h3>{`No Data To Show for year:${this.state.launchYear} and success launch: ${this.state.isLaunchSuccess}`}</h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Homepage