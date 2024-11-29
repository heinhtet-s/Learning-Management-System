import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config'

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface IUser extends Document {
    name: string
    email: string
    password: string
    avatar: {
        public_id: string
        url: string
    }
    role: string
    isVerified: boolean
    courses: Array<{ courseId: string }>
    comparePassword: (password: string) => Promise<boolean>
    SignAccessToken: () => string
    SignRefreshToken: () => string
}

const userSchema: Schema<IUser> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name']
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            validate: {
                validator: function (value: string) {
                    return emailRegexPattern.test(value)
                },
                message: 'please enter a valid email'
            },
            unique: true
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false
        },
        avatar: {
            public_id: String,
            url: String
        },
        role: {
            type: String,
            default: 'user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        courses: [
            {
                courseId: String
            }
        ]
    },
    { timestamps: true }
)

userSchema.pre<IUser>('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        this.password = (await bcrypt.hash(this.password, 10))
        next()
    } catch (error) {
        next(error instanceof Error ? error : new Error(String(error))) // Ensure error is an instance of Error
    }
})

// sign access token
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, config.ACCESS_TOKEN || '', {
        expiresIn: '5m'
    })
}

// sign refresh token

userSchema.methods.SignRefreshToken = function (): string {
    if (!config.REFRESH_TOKEN) {
        throw new Error('Refresh token secret is not defined')
    }

    // Type assertion to ensure the return type is string
    return jwt.sign({ id: this._id }, config.REFRESH_TOKEN, {
        expiresIn: '3d'
    })
}
// compare password
userSchema.methods.comparePassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
}

const userModel: Model<IUser> = mongoose.model('User', userSchema)

export default userModel
