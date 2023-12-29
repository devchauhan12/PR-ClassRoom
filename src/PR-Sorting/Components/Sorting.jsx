import React, { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import '../Assets/Sorting.css'

const Sorting = () => {
  const data = [
    { id: 1, name: 'Dev Joshi', email: 'dev@gmail.com', address: 'Surat', status: 'Active' },
    { id: 2, name: 'Neel Patel', email: 'neel@gmail.com', address: 'Mumbai', status: 'Away' },
    { id: 3, name: 'Om Prakash Jat', email: 'om@gmail.com', address: 'Delhi', status: 'Not Active' },
  ]


  const [noRecord, setNoRecord] = useState(false)
  const [filterData, setFilterData] = useState('')
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Active', 'Away', 'Not Active'];
  const [list, setList] = useState(data)
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setFilterData(searchValue)
    const filterList = data.filter(lists => lists.name.toLowerCase().includes(searchValue))
    setList(filterList)
  }

  const handleStatus = (e) => {
    const value = e.target.value

    setSelectedCategory(value)
    let filterStatus;
    if (value === 'All') {
      filterStatus = data;
    } else if (value === "Active") {
      filterStatus = data.filter(item => item.status === value);
    } else if (value === "Away") {
      filterStatus = data.filter(item => item.status === value);
    } else if (value === "Not Active") {
      filterStatus = data.filter(item => item.status === value);
    } else {
      filterStatus = data;
    }
    setList(filterStatus)
  }

  const handleSortButtonClick = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = [...list];

    sortedData.sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.id - b.id;

      } else {
        return b.id - a.id;
      }
    });
    setList(sortedData)
    setSortOrder(newSortOrder)
  }

  return (
    <Container className='mt-5'>
      <div className="Header d-flex justify-content-between">
        <h1 className='text-white'>User List</h1>
        <div className='d-flex'>
          <div>
            <label>
              Filter by Category:
              <select className='text-center align-items-center justify-content-center p-2 me-3 mt-2' style={{ overflow: "hidden" }} onChange={handleStatus}>
                {categories.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button className='btn btn-dark me-3' onClick={handleSortButtonClick}>Sort ID{sortOrder === 'asc' ? <i class="fa-solid fa-circle-up ms-2"></i> : <i class="fa-solid fa-circle-down ms-2"></i>}</button>
          <div className="input me-2">
            <input type="text" autoComplete="off" key={'input'} className='text-white' onChange={handleSearch} />
            <label>Name</label>
          </div>
        </div>
      </div>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            list && list.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td style={{ color: e.status === 'Active' ? 'green' : e.status === 'Away' ? '#FFB534' : 'red' }} >{e.status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

    </Container >
  )
}

export default Sorting