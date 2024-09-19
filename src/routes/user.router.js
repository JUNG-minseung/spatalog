import express from"express";
import { userDataClient } from "../utils/prisma/index.js";

const router = express.Router();

//회원가입 API
router.post('/sign-up', async(req, res, next) => {
    try {
        const {account, password, confirmedPassword, name} = req.body;

        const isExistUser = await userDataClient.account.findeFirst({
            where: {
                account, 
            },
        });

        if (isExistUser) {
            return res.status(489).json({message: " 이미 존재 하는 아디이빈다."});
        }

        const hashedPassword = await bctypt.hash(password, 10);

        const accountRegex = /^[a-z0-9]+$/;
        if (!accountRegex.test(account)) {
            return res
                .status(400)
                .json({message:"아이디가 영어 소문자와 숫자의 조합이어야한다."});
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({message:"비밀번호가 최소 6자 이상이어야 합니다."});
        }
        if (password !== confirmedPassword) {
            return res
                .status(400)
                .json({message:"비밀번호가 일치하지 않습니다."});
        }

        const user = await userDataClient.account.create({
            data: {
                account,
                password: hashedPassword,
                name,
            },
        });

        return res.status(201).json({
            userId:user.id,
            account:user.account,
            name:user.name,
        });

    }catch(error) {
    console.error("회원가입 중 에러 발생:", error);
    return res
        .status(500)
        .json({message:"회원가입중 에러가 발생하였습니다."});
    }
});


router.post("/sign-in", async (req, res, next) =>{
    try {
        const {account, password} = req.body;

        const user = await userDataClient.account.findeFirst({where:{account}});
        console.log(user);

        if (!user)
            return res.status(401).json ({message:"존재하지 않는 아이디입니다."});
        else if(!await bcrypt.compare(password, user.password))
            return res.status(401).json({message:"비밀번호가 일치하지 않습니다."});

        const token = jwt.sign(
            {
                userId: user.id,
            },
            "jwt-secret"
        );

        res.cookie("authorization", `bearer ${token}`);
        return res.status(200).json({message:"로그인 성공"});

    } catch(error) {
        console.error("로그인 에러 발생", error);
        return res
            .status(500)
            .json({message: "로그인 중 에러가 발생"});
    }

});

export default router;