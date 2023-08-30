import db, { dbInsert } from '../../config/db.config.js';

export async function create(req, res) {
  const { url, desc, shops } = req.body;

  const sql =
    'INSERT INTO banners(url, description, shopId) VALUES(?, ?, ?)';
  const values = [url, desc, shops];

  dbInsert(res, sql, values, 'Banner Created');
}

export async function get(req, res) {
  db.query('SELECT * FROM banners', (err, results, fields) => {
    if (err) {
      return res.status(500).json({
        message: err?.code || 'Somethings went wrong',
        cause: err || '',
        status: 500,
      });
    }
    return res.status(200).json({
      message: 'Get Shop Success',
      cause: '',
      status: 0,
      data: results,
    });
  });
}

export async function update(req, res) {
  const { url, description, bannerId } = req.body;

  db.query(
    'UPDATE banners SET url = ?, description = ? WHERE id = ?',
    [url, description, bannerId],
    (err, _results, _fields) => {
      if (err) {
        return res.status(500).json({
          message: err?.code || 'Somethings went wrong',
          cause: err || '',
          status: 500,
        });
      } else {
        return res.status(200).json({
          message: 'Update Banner Success',
          cause: '',
          data: null,
          status: 0,
        });
      }
    }
  );
}

export async function remove(req, res) {
  const { bannerId } = req.body;

  db.query(
    'DELETE FROM banners WHERE id = ?',
    [bannerId],
    (err, results, fields) => {
      if (err) {
        return res.status(500).json({
          message: err?.code || 'Somethings went wrong',
          cause: err || '',
          status: 500,
        });
      } else {
        return res.status(200).json({
          message: 'Remove Banner Success',
          cause: '',
          data: null,
          status: 0,
        });
      }
    }
  );
}
