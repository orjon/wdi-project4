import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import ProjectList from './lists/projectList'
import ProjectSummary from './lists/projectSummary'
import ProjectHeader from './lists/projectHeader'
import ModalProjectAdd from './modals/projectAdd'

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        code: '',
        name: '',
        client_id: ''
      },
      error: ''
    }
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({ modalShow: false })
  }

  handleShow() {
    this.setState({ modalShow: true })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/projects', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        projects: res.data.projects
      }, () => {

      }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
  }


  sumArray(array) {
    const length = array.length
    let sum = 0
    for (let i=0; i<length; i++) {
      sum += array[i].amount
    }
    return sum
  }

  comparator(array1, array2){
    const diff =this.sumArray(array1)-this.sumArray(array2)
    if (diff>0) return '>'
    if (diff<0) return '<'
    else return '='
  }




  render() {
    const modalClose = () => {
      this.setState({ modalShow: false })
      this.getData()
    }

    return (
      <main className="section">
        <div className="subHeader2">
          <Link to='/expenses' className='cell'>
            Projects
          </Link>
        </div>
        <div className = 'dataTable'>
          <ProjectHeader />
          {this.state.projects && this.state.projects.map(project => (
            <div key={project.id} className='lineItem'>
              <ProjectList
                project={project}
              />
              <ProjectSummary
                totalExpenses={this.sumArray(project.expenses)}
                comparator={this.comparator(project.expenses,project.invoices)}
                totalInvoiced={this.sumArray(project.invoices)}
              />
            </div>
          ))}
        </div>

        <div className = 'columns icons'>
          <div className= 'icons'>
            <button className='icon' onClick={this.handleShow}>
              <img alt='edit'
                src='http://www.orjon.com/dev/project4/iconAddCircle.png'
                width='25'
                height='25'/>
            </button>
          </div>
        </div>


        <ModalProjectAdd show={this.state.modalShow} error={this.state.error} onHide={modalClose}/>


      </main>
    )
  }
}

export default Projects
