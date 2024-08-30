import petugas from "../model/modelPetugas.js";
import artikel from "../model/modelArtikel.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).send('Username or password missing');
        }

        const user = await petugas.findOne({ where: { username } });
        if (!user) {
            return res.status(401).send('<script>alert("Invalid credentials"); window.location.href="/auth/login";</script>');
        }

        const isPasswordValid = password === user.password; // Pastikan menggunakan hashing password di aplikasi sebenarnya
        if (!isPasswordValid) {
            return res.status(401).send('<script>alert("Invalid credentials"); window.location.href="/auth/login";</script>');
        }

        req.session.userId = user.id_petugas;

        // Mengirimkan alert saat berhasil login
        res.send('<script>alert("Login successful!"); window.location.href="/auth/welcome";</script>');
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('<script>alert("Login failed"); window.location.href="/auth/login";</script>');
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err });
        } else {
            res.send('<script>alert("Logout successful!"); window.location.href="/auth/login";</script>');
        }
    });
};

export const getPetugasPage = async (req, res) => {
    try {
        const user = await petugas.findByPk(req.session.userId); // Perbaiki dari `id_petugas` ke `userId`
        if (!user) {
            return res.status(404).send('User not found');
        }
        const artikels = await artikel.findAll(); // Ambil semua artikel dari database
        //console.log('User:', user);
        res.render('petugas/welcome', { user, artikel: artikels }); // Mengirim data petugas ke template 'welcome.ejs'
    } catch (error) {
        console.error('Error getting petugas page:', error);
        res.status(500).send('An error occurred');
    }
};
