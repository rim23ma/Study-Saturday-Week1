const express = require('express');
const router = express.Router();
module.exports = router;

let student = [{id:1, name: 'Dan'}, {id:2, name: 'Karen'}, {id:3, name: 'Kate'}, {id:4, name: 'Peter'}]

router.get('/', (req, res) => {
  res.send(student)
})

router.get('/:id', (req, res) => {
  const id = req.params.id;

  let singleStudent = student.filter(elem => {
    return elem.id === Number(id)
  })
  if (!singleStudent.length) res.send('Student not found')
  res.send(singleStudent[0])
})

router.post('/', (req, res) => {
  // const body = req.body;
  let singleStudent = student.filter(elem => {
    return elem.id === Number(req.body.id)
  })
  if (singleStudent) res.send('There is a student with this ID')
  student.push({id: Number(req.body.id), name: req.body.name})
  const id = req.body.id;
 // res.send(body)
   res.redirect(`/student/${id}`);

})

router.put('/:id', (req, res) => {
  const id = req.params.id;

  student.forEach(elem => {
    if (Number(id) === elem.id) {
      elem.name = req.body.name
    }
  })

  res.redirect(`/student/${id}`)
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let index = 0;
  student.forEach((elem, indx) => {
    if (Number(id) === elem.id) {
      index = indx + 1
    }
  });

  if (!index) res.send('There is no student with this ID')

  else student.splice(index - 1, 1)

  res.redirect(`/student`)

})
