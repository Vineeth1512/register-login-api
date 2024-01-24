const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5678
const User = require("./models/user")

const MOGOURI = 'mongodb+srv://dbUser:dbUserPassword@atlascluster.w6sb48g.mongodb.net/Registration?retryWrites=true&w=majority'

mongoose.connect(MOGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo yeahhh')
})
mongoose.connection.on('error', (err) => {
    console.log('error', err)
})


app.use(express.json())

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(422).json({ error: "plase add all the fields" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(422).json({ error: "user already exists with that email" })
        }
        // const hashedPassword = await bcrypt.hash(password, 12)
        await new User({
            email,
            password: password
        }).save()
        res.status(200).json({ message: "signup success you can login now" })

    } catch (err) {
        console.log(err)
    }

})
app.get("/", (req, res) => {
    res.json("welcome to vercel hosting");
})


app.listen(PORT, () => {
    console.log('server running on ', PORT)
})