import { motion } from "framer-motion"

export default function EnterAnimation({width, height, backgroundColor, top, left, borderRadius, bottom, right}:{width:number, height:number, backgroundColor:string, top?:number, left?:number, borderRadius?:string, bottom?:number, right?:number}) {
    const ball = {
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        marginTop: top,
        marginLeft: left,
        marginBottom: bottom,
        marginRight: right,
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
                scale: 1.1, 
                rotate: 5,
            }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", stiffness: 300, damping: 10 },
                rotate: { type: "spring", stiffness: 300, damping: 15 }
            }}
            style={ball}
        />
    )
}
