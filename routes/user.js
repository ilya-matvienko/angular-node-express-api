var express = require('express');
var router = express.Router();
var UserService = require('../services/service.user');

// Получить список юзеров
router.get('/', async function(req, res, next) {
  res.json({error: "Invalid user UID."});
});

// Добавить нового юзера
router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    const user = await UserService.create(body);

    if(body.guid) {
      user.guid = body.guid;
    }

    res.cookie('guid', user.guid, { maxAge: 900000, httpOnly: true });
    return res.status(201).json({ user });
  }
  catch(err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }

    return next(err);
  }
});

// Получение uid юзера
router.get('/:id', async (req, res, next) => {
  try {
    const user = await UserService.retrieve(req.params.id);
    return res.json({ user });
  }
  catch(err) {
    return next(err);
  }
});

// Обновление юзера по uid
router.put('/:id', async (req, res, next) => {
  try {
    const user = await UserService.update(req.params.id, req.body);
    return res.json({ user });
  }
  catch(err) {
    return next(err);
  }
});

// Удаление юзера по uid
router.delete('/:id', async (req, res, next) => {
  try {
    // const user = await UserService.delete(req.params.id);
    return res.json({success: true});
  }
  catch(err) {
    return next(err);
  }
});

module.exports = router;
