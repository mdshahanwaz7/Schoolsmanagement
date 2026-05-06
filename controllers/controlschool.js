import db from '../config/db.js'
export const addSchool = (req, res) => {
const { name, address, latitude, longitude } = req.body;

    
    if (!name || !address || latitude == null || longitude == null) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const query = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
         res.json({
            message: "School added successfully",
            schoolId: result.insertId
        });
    });
};


const getDistance = (userlat1, userlon1, schoollat2, schoollon2) => {
    const R = 6371;

    const toRad = (val) => (val * Math.PI) / 180;

    const dLat = toRad(schoollat2 - userlat1);
    const dLon = toRad(schoollon2 - userlon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(userlat1)) *
        Math.cos(toRad(schoollat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({
            message: "Latitude and Longitude are required"
        });
    }

    db.query('SELECT * FROM schools', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }

        const sortedSchools = results
            .map((school) => ({
                ...school,
                distance: getDistance(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    school.latitude,
                    school.longitude
                )
            }))
            .sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    });
};

export const getAllSchools = (req, res) => {
    db.query('SELECT * FROM schools', (err, results) => 
     { console.log("hello schools");
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};