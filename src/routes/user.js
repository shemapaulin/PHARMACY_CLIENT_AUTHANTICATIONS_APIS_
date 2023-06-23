import { Router } from "express";
import { clientLogin, createUserAccount,createAppointment,isSecure,getUser,getUsers} from "../controllers/userController";

const router = Router();

router.post("/user", createUserAccount);
router.post("/login", clientLogin);
router.get("/account", isSecure ,getUser);
router.get("/accounts",getUsers);
router.post("/appointment", isSecure ,createAppointment);

const userRouter = router;
export default userRouter;