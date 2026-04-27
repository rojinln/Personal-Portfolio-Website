"use client";

import { motion } from "framer-motion";

export default function CuteCat() {
  return (
    <div className="relative h-[280px] w-full sm:h-[320px] md:h-[420px]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(243,166,200,0.22),rgba(196,181,253,0.10)_42%,rgba(17,24,39,0)_70%)]" />
      <motion.svg
        viewBox="0 0 500 500"
        role="img"
        aria-label="Cute white kitten illustration with pink bows"
        className="relative z-10 h-full w-full drop-shadow-[0_24px_50px_rgba(243,166,200,0.18)]"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.6 },
          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <defs>
          <linearGradient id="catFur" x1="110" x2="380" y1="85" y2="430">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="72%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E7E9F1" />
          </linearGradient>
          <linearGradient id="catPink" x1="150" x2="360" y1="70" y2="360">
            <stop offset="0%" stopColor="#FBC4DC" />
            <stop offset="100%" stopColor="#F3A6C8" />
          </linearGradient>
          <filter id="catShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#7DD3FC" floodOpacity="0.12" />
          </filter>
        </defs>

        <g opacity="0.78">
          <circle cx="88" cy="126" r="2.2" fill="#F3A6C8" />
          <circle cx="407" cy="114" r="1.9" fill="#C4B5FD" />
          <circle cx="423" cy="284" r="1.8" fill="#F3A6C8" />
          <circle cx="112" cy="335" r="1.6" fill="#7DD3FC" />
        </g>

        <g filter="url(#catShadow)" stroke="#0F172A" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M148 258 C93 225 78 203 92 184 C127 163 170 190 205 229 C178 244 164 252 148 258Z"
            fill="url(#catPink)"
            strokeWidth="8"
          />
          <path
            d="M350 250 C417 208 431 188 413 169 C369 149 331 184 296 226 C318 239 334 245 350 250Z"
            fill="url(#catPink)"
            strokeWidth="8"
          />
          <path d="M104 190 C131 199 158 213 190 237" fill="none" strokeWidth="3.5" opacity="0.45" />
          <path d="M405 177 C374 194 345 209 311 232" fill="none" strokeWidth="3.5" opacity="0.45" />

          <path
            d="M337 364 C408 372 438 335 424 301 C412 273 371 275 350 305 C338 322 341 338 360 346"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="38"
          />
          <path
            d="M337 364 C408 372 438 335 424 301 C412 273 371 275 350 305 C338 322 341 338 360 346"
            fill="none"
            stroke="#0F172A"
            strokeWidth="8"
          />

          <path
            d="M205 232 C160 278 154 386 193 430 C225 466 299 462 331 426 C370 381 354 278 304 231 C278 208 231 208 205 232Z"
            fill="url(#catFur)"
            strokeWidth="8"
          />
          <path
            d="M220 251 C208 281 198 318 207 359 C218 337 229 330 237 317 C230 351 238 378 255 401 C259 368 272 347 286 330 C283 306 268 276 250 252"
            fill="#FFFFFF"
            strokeWidth="6"
          />

          <path d="M207 390 C190 407 181 426 191 439 C205 453 235 441 238 414" fill="#F8FAFC" strokeWidth="7" />
          <path d="M309 389 C330 403 342 423 332 438 C317 453 287 440 284 414" fill="#F8FAFC" strokeWidth="7" />
          <path d="M198 430 C205 421 213 419 218 435" fill="none" strokeWidth="4" />
          <path d="M224 430 C229 421 236 421 240 435" fill="none" strokeWidth="4" />
          <path d="M296 430 C301 421 309 421 313 435" fill="none" strokeWidth="4" />
          <path d="M320 430 C326 421 334 421 337 435" fill="none" strokeWidth="4" />

          <path
            d="M122 165 C106 105 136 65 191 105 C230 82 275 82 314 105 C370 65 399 105 383 165 C400 206 382 252 340 274 C288 300 210 300 159 274 C117 252 104 206 122 165Z"
            fill="url(#catFur)"
            strokeWidth="8"
          />
          <path d="M133 158 C130 101 145 82 190 107 C165 122 148 140 133 158Z" fill="#FFFFFF" strokeWidth="7" />
          <path d="M367 158 C370 101 355 82 310 107 C335 122 352 140 367 158Z" fill="#FFFFFF" strokeWidth="7" />
          <path d="M143 146 C146 116 155 105 181 114 C163 124 151 135 143 146Z" fill="#F8B7D2" strokeWidth="3" />
          <path d="M357 146 C354 116 345 105 319 114 C337 124 349 135 357 146Z" fill="#F8B7D2" strokeWidth="3" />
          <path d="M154 124 C149 136 145 143 140 151" fill="none" strokeWidth="3" opacity="0.55" />
          <path d="M346 124 C351 136 355 143 360 151" fill="none" strokeWidth="3" opacity="0.55" />

          <path
            d="M229 99 C236 67 256 52 281 35 C272 70 282 83 298 98 C274 91 252 92 229 99Z"
            fill="#FFFFFF"
            strokeWidth="7"
          />
          <path d="M215 84 C184 63 170 75 178 100 C188 124 213 112 233 95Z" fill="url(#catPink)" strokeWidth="7" />
          <path d="M285 84 C316 63 330 75 322 100 C312 124 287 112 267 95Z" fill="url(#catPink)" strokeWidth="7" />
          <circle cx="250" cy="94" r="17" fill="url(#catPink)" strokeWidth="7" />

          <ellipse cx="196" cy="190" rx="23" ry="30" fill="#050816" strokeWidth="5" />
          <ellipse cx="304" cy="190" rx="23" ry="30" fill="#050816" strokeWidth="5" />
          <circle cx="188" cy="179" r="7" fill="#FFFFFF" stroke="none" />
          <circle cx="296" cy="179" r="7" fill="#FFFFFF" stroke="none" />
          <circle cx="205" cy="203" r="4" fill="#C4B5FD" stroke="none" opacity="0.8" />
          <circle cx="313" cy="203" r="4" fill="#C4B5FD" stroke="none" opacity="0.8" />

          <path d="M174 180 C160 170 154 159 151 149" fill="none" strokeWidth="4" />
          <path d="M181 173 C168 158 165 149 164 140" fill="none" strokeWidth="4" />
          <path d="M326 180 C340 170 346 159 349 149" fill="none" strokeWidth="4" />
          <path d="M319 173 C332 158 335 149 336 140" fill="none" strokeWidth="4" />
          <path d="M169 154 C183 139 204 140 217 153" fill="none" strokeWidth="5" />
          <path d="M283 153 C296 140 317 139 331 154" fill="none" strokeWidth="5" />

          <ellipse cx="250" cy="220" rx="19" ry="14" fill="#F6A5C7" strokeWidth="5" />
          <path d="M250 234 C250 248 240 255 229 251" fill="none" strokeWidth="5" />
          <path d="M250 234 C250 248 260 255 271 251" fill="none" strokeWidth="5" />
          <path d="M237 257 C247 275 263 275 273 257 C260 264 249 264 237 257Z" fill="#F7A6C8" strokeWidth="5" />

          <ellipse cx="178" cy="225" rx="22" ry="9" fill="#F3A6C8" stroke="none" opacity="0.22" />
          <ellipse cx="322" cy="225" rx="22" ry="9" fill="#F3A6C8" stroke="none" opacity="0.22" />

          <path d="M152 218 C112 204 80 202 48 210" fill="none" strokeWidth="4" />
          <path d="M153 232 C111 234 78 243 50 258" fill="none" strokeWidth="4" />
          <path d="M153 246 C119 266 92 287 72 312" fill="none" strokeWidth="4" />
          <path d="M348 218 C388 204 420 202 452 210" fill="none" strokeWidth="4" />
          <path d="M347 232 C389 234 422 243 450 258" fill="none" strokeWidth="4" />
          <path d="M347 246 C381 266 408 287 428 312" fill="none" strokeWidth="4" />

          <path d="M191 299 C173 326 169 355 179 388" fill="none" strokeWidth="5" opacity="0.9" />
          <path d="M319 298 C340 334 340 370 325 403" fill="none" strokeWidth="5" opacity="0.9" />
          <path d="M292 376 C316 360 339 353 363 356" fill="none" strokeWidth="5" opacity="0.85" />
        </g>
      </motion.svg>
    </div>
  );
}
