import Artikel from "../model/modelArtikel.js";

export const getArtikel = async (req, res) => {
    try {
        const items = await Artikel.findAll({
            attributes: ['judul_artikel', 'konten', 'tanggal_post', 'updatedAt']
        });
        //const artikelCount = items.length; // Menghitung jumlah artikel
        res.render('index', { artikel: items }); //, artikelCount: artikelCount
    } catch (error) {
        res.status(500).send('<script>alert("Error mendapatkan artikel"); window.location.href="/";</script>');
    }
};

export const createArtikel = async (req, res) => {
    const { judul_artikel, konten } = req.body;
    try {
        await Artikel.create({
            judul_artikel,
            konten,
            id_petugas: req.session.userId
        });
        res.status(200).send('<script>alert("Berhasil membuat artikel"); window.location.href="/auth/welcome";</script>');
    } catch (error) {
        res.status(500).send('<script>alert("Gagal membuat artikel"); window.location.href="/auth/buatartikel";</script>');
    }
};


export const updateArtikel = async (req, res) => {
    try {
        const [updated] = await Artikel.update(req.body, { where: { id: req.params.id } });
        if (!updated) {
            res.status(404).send('<script>alert("Artikel tidak ditemukan"); window.location.href="/auth/welcome";</script>');
        } else {
            res.status(200).send('<script>alert("Artikel berhasil diperbarui"); window.location.href="/auth/welcome";</script>');
        }
    } catch (error) {
        res.status(500).send('<script>alert("Gagal memperbarui artikel"); window.location.href="/auth/ubahartikel/' + req.params.id + '";</script>');
    }
};

export const deleteArtikel = async (req, res) => {
    try {
        const deleted = await Artikel.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            res.status(404).send('<script>alert("Artikel tidak ditemukan"); window.location.href="/auth/welcome";</script>');
        } else {
            res.status(200).send('<script>alert("Artikel berhasil dihapus"); window.location.href="/auth/welcome";</script>');
        }
    } catch (error) {
        res.status(500).send('<script>alert("Gagal menghapus artikel"); window.location.href="/auth/welcome";</script>');
    }
};

export const renderTambahArtikel = (req, res) => {
    res.render('petugas/tambahartikel');
};

export const renderUbahArtikel = async (req, res) => {
    try {
        const artikel = await Artikel.findByPk(req.params.id);
        if (!artikel) {
            return res.status(404).send('<script>alert("Article not found"); window.location.href="/auth/welcome";</script>');
        }
        res.render('petugas/ubahartikel', { artikel });
    } catch (error) {
        res.status(500).send('<script>alert("Error fetching article data"); window.location.href="/auth/welcome";</script>');
    }
};


//for next improvement, add a render file for get some related article (if any)
//export const getArtikelbyId = async (req, res) => {
//    try {
//        const [getArtikelbyId] = await Artikel.findByPk(req.body, { where: { id: req.params.id } });
//        if (!getArtikelbyId) {
//            res.status(404).send('<script>alert("Artikel tidak ditemukan"); window.location.href="index";</script>');
//        } else {
//            res.status(200).send('<script>alert("Artikel ditemukan"); window.location.href="index";</script>');
//        }
//    } catch (error) {
//        res.status(500).send('<script>alert("Gagal menampilkan artikel"); window.location.href="/auth/ubahartikel/' + req.params.id + '";</script>');
//    }
//};

//export const renderTampilArtikelbyId = (req, res) => {
//    res.render('artikel');
//};

