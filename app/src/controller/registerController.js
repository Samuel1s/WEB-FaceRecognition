import UsersModel from '../model/users.js'

export const showUserDataRegisterForm = async (req, res) => {
    const error_msg = req.flash('error_msg') 

    return res.render('registerForm', { error_msg })
}

export const saveUserData = async (req, res) => {
    try {
        const user = new UsersModel(req.body)
        const save = await user.save()
       
        if(save) {
            res.cookie('context', save, { httpOnly: true })
            return res.redirect('/faceRegister') 
        }

    } catch (error) {
        req.flash('error_msg', 'Email já em uso, tente outro.')
        return res.redirect('/dataRegister')
    }
}

export const showUserFaceRegisterInterface = async (req, res) => {
    const context = req.cookies['context']
    
    return res.render('registerFace', { 
        data: context, 
        LOCAL_URL: process.env.LOCAL_URL, API_URL: process.env.API_URL, KEY: process.env.KEY 
    }) 
}

export const updateAndSaveUserFace = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).send({ error: 'Users id is missing.' })
    }

    try {
        const updatedUser = await UsersModel.findOneAndUpdate({ _id: id }, { userImage: req.body }, { new: true })

        if (updatedUser) {
            req.flash('success_msg', 'Usuário cadastrado.')

            return res.status(200).json({ redirect: '/'})
        }

        return res.status(400).send({ error: 'Could not update the user.' })

    } catch (error) {
        res.send(error)
    }
}