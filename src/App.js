import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FaSortAlphaDown } from 'react-icons/fa'
import { Button, Modal, Input } from 'antd';



function CrudData() {
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);



  const [inputdata, setInputData] = useState({
    fname: "",
    email: "",
    pass: "",
    city: ""
  })

  const onEditOk = (e) => {
    if (editIndex !== -1) {
      const editData = records.map((value, index) => {
        if (index === editIndex) {
          return inputdata;
        }
        return value;
      });
      setRecords(editData);
      localStorage.setItem("data", JSON.stringify(editData))
      setEditIndex(-1);
    }
    else {
      setEditIndex([...records, inputdata]);
      localStorage.setItem("data", JSON.stringify(editIndex))
    }
    setIsEditModalOpen(false);
  }

  const onEditCancel = () => {
    setIsEditModalOpen(false)
  }


  const handleOk = () => {
    setRecords(records?.filter((item, index) => index !== deleteIndex));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const [selectedSearch, setSearchSelected] = useState("")


  const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    getData()
  }, [])


  const handelchange = (e) => {
    setInputData({
      ...inputdata, [e.target.name]: e.target.value
    })
  }


  const [records, setRecords] = useState(JSON.parse(localStorage.getItem("data")) || []);


  const handelSubmit = () => {

    if (isEdit !== -1) {
      const edit = records.map((value, index) => {
        if (index === isEdit) {
          return inputdata;
        }
        return value;
      });
      setRecords(edit);
      localStorage.setItem("data", JSON.stringify(edit))
      setIsEdit(-1);
    }
    else {
      axios.post("https://jsonplaceholder.typicode.com/posts", records)
        .then((res) => { console.log(res) })
        .catch((e) => { console.log(e) })

      setRecords([...records, inputdata]);
      localStorage.setItem("data", JSON.stringify([...records, inputdata]))
    }
  }


  const [isEdit, setIsEdit] = useState(-1)

  const handelEdit = (index) => {
    setIsEdit(index);
    const editData = records.find((item, index1) => { return index1 === index });
    setInputData(editData);
  }


  const [selected, setSelected] = useState([ ]);

  const handelDelete = (index) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${index}`)
      .then((res) => {
        console.log(res);
        getData()

      })
      .catch((e) => console.log(e))


    const updated = records.filter((item, inn) => inn !== index);
    setRecords(updated);
    localStorage.setItem("data", JSON.stringify(updated))
  }


  const handelDeleteSelected = () => {
    const updatedData1 = records.filter((item) => !selected.includes(item.fname))
    setRecords(updatedData1);

    setSelected([updatedData1]);
    localStorage.setItem("data", JSON.stringify(updatedData1))
    
  }


  const handelCheckbox = (e) => {

    if (e.target.name === "selectall") {
      if (selected?.length === records?.length) {
        setSelected([])
      }
      else setSelected(records?.map((item) => item.fname))
    }
    else {
      if (selected?.includes(e.target.value)) {
        setSelected(selected?.filter((item) => item !== e.target.value))
      }
      else setSelected([...selected, e.target.value])
    }
  }




  const [sort, setSort] = useState("")

  const handelSortFname = () => {
    const sort = records.sort((a, b) => a["fname"].localeCompare(b["fname"]));
    setSort([])
  }

  const handelSortEmail = () => {
    const sort = records.sort((a, b) => a["email"].localeCompare(b["email"]));
    setSort([])
  }

  const handelSortPass = () => {
    const sort = records.sort((a, b) => a["pass"].localeCompare(b["pass"]));
    setSort([])
  }

  const handelSortCity = () => {
    const sort = records.sort((a, b) => a["city"].localeCompare(b["city"]));
    setSort([])
  }


  const [searchdata, setSearchData] = useState("")

  const getSearchData = useMemo(() => {

    if (selectedSearch === "fname") {
      return records?.filter((item) => { return (item?.fname?.toLocaleLowerCase().includes(searchdata?.toLocaleLowerCase())) })
    }
    else if (selectedSearch === "email") {
      return records?.filter((item) => { return (item?.email?.toLocaleLowerCase().includes(searchdata?.toLocaleLowerCase())) })
    }
    else if (selectedSearch === "pass") {
      return records?.filter((item) => { return (item?.pass?.toLocaleLowerCase().includes(searchdata?.toLocaleLowerCase())) })
    }
    else if (selectedSearch === "city") {
      return records?.filter((item) => { return (item?.city?.toLocaleLowerCase().includes(searchdata?.toLocaleLowerCase())) })
    }
    else return records

  }, [selectedSearch, records])


  return (
    <>
      <div style={{
        backgroundImage:
          'url("https://www.imageshine.in/uploads/gallery/Free-vector-hand-painted-watercolor-abstract-watercolor-background.jpg")',
        padding: "2%",
        width: "100% 100%",
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundPosition: "50% 50%",
      }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="fname" style={{ fontSize: "20px" }}>First Name : </label>
              <input type="text" name="fname" placeholder="enter your name" style={{ width: "300px", padding: "8px", marginLeft: "10px" }} onChange={(e) => handelchange(e)} value={inputdata.fname} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="email" style={{ fontSize: "20px" }}>Email : </label>
              <input type="email" name="email" placeholder="enter your email" style={{ width: "300px", padding: "8px", marginLeft: "13%" }} onChange={(e) => handelchange(e)} value={inputdata.email} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="pass" style={{ fontSize: "20px" }}>Password : </label>
              <input type="password" name="pass" placeholder="enter your password" style={{ width: "300px", padding: "8px", marginLeft: "22px" }} onChange={(e) => handelchange(e)} value={inputdata.pass} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label htmlFor="city" style={{ fontSize: "20px" }}>City : </label>
              <input type="city" name="city" placeholder="enter your city name" style={{ width: "300px", padding: "8px", marginLeft: "16%" }} onChange={(e) => handelchange(e)} value={inputdata.city} />
            </div>
            <div>
              <Button className="submit" onClick={() => handelSubmit()} style={{ border: "2px solid #4682B4", backgroundColor: "transparent", fontSize: "18px", marginTop: "20px", marginLeft: "35%", alignItems: "center" }}>submit</Button>
            </div>
            <div>
              <Button onClick={() => handelDeleteSelected()} style={{ border: "2px solid #4682B4", backgroundColor: "transparent", fontSize: "18px", marginTop: "20px", marginLeft: "35%" }}>Delete Selected</Button><br /><br />

              <select onChange={(e) => setSearchSelected(e.target.value)}>
                <option value="fname">Fname</option>
                <option value="email">Email</option>
                <option value="pass">Password</option>
                <option value="city">City</option>
              </select>
              <input type="text" name="search" placeholder="Search Here..." style={{ width: "300px", padding: "8px", marginLeft: "10px" }} onChange={(e) => setSearchData(e.target.value)} value={searchdata} />


            </div>
          </div>
        </div>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>Select All <input type='checkbox' checked={selected?.length === records?.length} name='selectall' onChange={(e) => handelCheckbox(e)}></input> </th>
            <th>First Name <button style={{ border: "none", backgroundColor: "white" }} onClick={() => handelSortFname()}> <FaSortAlphaDown style={{ border: "1px solid black", fontSize: "18px" }} /> </button> </th>
            <th>Email<button style={{ border: "none", backgroundColor: "white" }} onClick={() => handelSortEmail()}> <FaSortAlphaDown style={{ border: "1px solid black", fontSize: "18px" }} /> </button> </th>
            <th>Password <button style={{ border: "none", backgroundColor: "white" }} onClick={() => handelSortPass()}> <FaSortAlphaDown style={{ border: "1px solid black", fontSize: "18px" }} /> </button> </th>
            <th>City<button style={{ border: "none", backgroundColor: "white" }} onClick={() => handelSortCity()}> <FaSortAlphaDown style={{ border: "1px solid black", fontSize: "18px" }} /> </button> </th>
            <th>Delete</th>
            <th>Edit</th>

          </tr>
        </thead>
        <tbody>
          {getSearchData.map((item, index) => {
            return (
              <tr>
                <td><input type='checkbox' checked={selected?.includes(item.fname)} onChange={(e) => handelCheckbox(e)} value={item.fname} name={item.fname} ></input></td>
                <td>{item.fname}</td>
                <td>{item.email}</td>
                <td>{item.pass}</td>
                <td>{item.city}</td>
                <td><Button onClick={() => { setDeleteIndex(index); setIsModalOpen(true) }}>Delete</Button></td>
                <td><Button onClick={() => { setEditIndex(index); setInputData(item); setIsEditModalOpen(true) }} >Edit</Button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal title="Delete Record !" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Are you sure you want to delete the record?
      </Modal>

      <Modal title="Edit Data" open={isEditModalOpen} onOk={onEditOk} onCancel={onEditCancel}>
        <Input type='text' name='fname' placeholder='First Name' value={inputdata?.fname} onChange={(e) => handelchange(e)} /><br/><br/>
        <Input type='email' name='email' placeholder='Email' value={inputdata?.email} onChange={(e) => handelchange(e)} /><br/><br/>
        <Input type='password' name='pass' placeholder='Password' value={inputdata?.pass} onChange={(e) => handelchange(e)} /><br/><br/>
        <Input type='text' name='city' placeholder='City' value={inputdata?.city} onChange={(e) => handelchange(e)} />
      </Modal>
    </>
  )
}


export default CrudData;  