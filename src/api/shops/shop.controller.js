import db, { dbInsert } from '../../config/db.config.js';

export async function create(req, res) {
  const {
    name,
    coordinates: { lat, lng },
  } = req.body;

  const sql = 'INSERT INTO shops(name, coordinates) VALUES(?, POINT(?, ?))';
  const values = [name, lat, lng];

  dbInsert(res, sql, values, 'Shop Created');
}

export async function get(req, res) {
  db.query(
    'SELECT name, ST_X(coordinates) AS lat, ST_Y(coordinates) AS lng FROM shops',
    (err, results, fields) => {
      if (err) {
        return res.status(500).json({
          message: err?.code || 'Somethings went wrong',
          cause: err || '',
          status: 500,
        });
      }
      console.log('results', results);
      return res.status(200).json({
        message: 'Get Shop Success',
        cause: '',
        status: 0,
        data: results.map((item) => {
          return {
            name: item.name,
            coordinates: {
              latitude: item.lat,
              longtitide: item.lng,
            },
          };
        }),
      });
    }
  );
}

export async function update(req, res) {
  console.log('req.body :', req.body);
  const { name, lat, lng, shopId } = req.body;
  db.query(
    'SELECT * FROM shops WHERE id = ?',
    [shopId],
    (err, results, fields) => {
      if (results.length) {
        const shop = results[0];
        db.query(
          'UPDATE shops SET name = ?, coordinates = POINT(?, ?) WHERE id = ?',
          [name, lat, lng, shopId],
          (_err, _results, _fields) => {
            if (_err) {
              return res.status(500).json({
                message: err?.code || 'Somethings went wrong',
                cause: err || '',
                status: 500,
              });
            } else {
              return res.status(200).json({
                message: 'Update Shop Success',
                cause: '',
                data: null,
                status: 0,
              });
            }
          }
        );

        //   }
      } else {
        return res.status(400).json({
          message: err?.code || 'username or password incorrect',
          cause: err || '',
          status: 400,
        });
      }
    }
  );
}

export async function remove(req, res) {
  console.log('req.body; :', req.body);
  const { shopId } = req.body;

  db.query(
    'DELETE FROM shops WHERE id = ?',
    [shopId],
    (err, results, fields) => {
      if (err) {
        return res.status(500).json({
          message: err?.code || 'Somethings went wrong',
          cause: err || '',
          status: 500,
        });
      } else {
        return res.status(200).json({
          message: 'Remove Shop Success',
          cause: '',
          data: null,
          status: 0,
        });
      }
    }
  );
}
