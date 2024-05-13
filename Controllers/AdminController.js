const { con } = require("../config/dbConntectSQL");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("../Utils/Cloudinary");

async function Addbook(req, res) {
    try {
       
        const { bookName, bookDescription, bookPrice, bookQuantity } = req.body;
        const image = req.body.image;
        console.log("dkldlk")
         console.log(image);
        if (bookName != "" && bookName != undefined && bookDescription != "" && bookDescription != undefined &&
            bookPrice != "" && bookPrice != undefined && bookQuantity != "" && bookQuantity != undefined
        ) {

            const upload = await cloudinary.uploader.upload(image, {
                folder: "Bookstore bookUploads"
            });

            if (upload) {

                const bookimageurl = upload.secure_url;
                const bookId = uuidv4();
                const value = [bookId, bookName, bookDescription, bookPrice, bookQuantity,bookimageurl]
                const Query = `INSERT INTO books(bookId,bookName,bookDescription,bookPrice,bookQuantity,bookimageurl) VALUES (?,?,?,?,?,?)`;

                await con.query(Query, value, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //    res.json({message:"Book added successfully"})
                        res.redirect('/home')
                    }

                })
            }
            else {
                res.render('Addbook', { message: "image upload failed" });
            }


        }
        else {
            res.render('Addbook', { message: "All Credentials required" });
        }


    }
    catch (error) {
        console.log(error);
        res.render('Addbook', { message: "Something went wrong" });
    }
}

module.exports = Addbook