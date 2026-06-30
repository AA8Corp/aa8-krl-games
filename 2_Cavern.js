// ============================================================
//  GAME 2:  JUNGLE QUEST     AA8 Corporation STEM
//  A forgiving, juicy, side-scrolling platformer treasure hunt.
//  No tilemap API and no color API, so it pastes and runs
//  cleanly on any MakeCode Arcade build.
//
//  ---- HOW TO LOAD ON YOUR ELECFREAKS RETRO ARCADE ----
//  1. arcade.makecode.com -> New Project ("Jungle Quest")
//  2. Click the {} JavaScript toggle, select-all, delete, paste
//  3. Press Play to test, then Download -> drag .uf2 to drive
// ============================================================

// ---------- ⚙️ CONFIG / EDIT-ME ----------
let START_LIVES = 5
let GRAVITY = 550
let JUMP_VELOCITY = -200
let DOUBLE_JUMP_VELOCITY = -170
let NORMAL_MOVE_SPEED = 70
let BOOTS_MOVE_SPEED = 100
let COCONUT_SPEED = 180
let COYOTE_TIME_MS = 150
let POWERUP_DURATION_MS = 6000
let INVINCIBILITY_IFRAMES_MS = 1200
let BOSS_MAX_HP = 8
let BOSS_PROJECTILE_SPEED = 85
let SCORE_GEM = 10
let SCORE_LEVEL_CLEAR = 100
let SCORE_ALL_GEMS_BONUS = 50

// ---------- 🗺️ LEVELS ----------
let LEVEL_1 = [
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X......................................X",
    "X.......g........g.............g.......X",
    "X......XXX......XXX......g....XXX......X",
    "X......................XXX.............X",
    "X..@........e........P..............F..X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
]

let LEVEL_2 = [
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X......g.......................g.................X",
    "X.....XXX.....f.......g.......XXX......f.........X",
    "X............XXX.....XXX..............XXX........X",
    "X..@.......h.......P.......h.................F...X",
    "X.XXXXX...XXXXX...XXXXX...XXXXX...XXXXX...XXXXXX.X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
]

let LEVEL_3 = [
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "X.......g..........................g.......................X",
    "X......XXX......f........g........XXX......................X",
    "X..@.........e......h...XXX...e............................X",
    "X.XXXX....XXXXXX...XXX.......XXX...........................X",
    "X................P................P........................X",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
]

let LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3]

// ---------- 🎨 ART ----------
let img_wall = img`
d d d d d d d d d d d d d d d d
d 7 7 7 7 7 d d 7 7 7 7 7 7 d d
d 7 e e e 7 d d 7 e e e e 7 d d
d 7 e e e 7 d d 7 e e e e 7 d d
d 7 7 7 7 7 d d 7 7 7 7 7 7 d d
d d d d d d d d d d d d d d d d
d d 7 7 7 7 7 7 7 7 7 d d d d d
d d 7 e e e e e e e 7 d d d d d
d d 7 7 7 7 7 7 7 7 7 d d d d d
d d d d d d d d d d d d d d d d
d 7 7 7 7 d d d d 7 7 7 7 7 d d
d 7 e e 7 d d d d 7 e e e 7 d d
d 7 e e 7 d d d d 7 e e e 7 d d
d 7 7 7 7 d d d d 7 7 7 7 7 d d
d d d d d d d d d d d d d d d d
d d d d d d d d d d d d d d d d
`

let img_hero_idle = img`
. . . . . . 2 2 2 2 . . . . . .
. . . . . 2 2 2 2 2 2 . . . . .
. . . . 2 2 d d d d 2 2 . . . .
. . . . 2 d f 1 1 f d 2 . . . .
. . . . d d f 1 1 f d d . . . .
. . . . d d d d d d d d . . . .
. . . . . d d 2 2 d d . . . . .
. . . . 8 8 9 9 9 9 8 8 . . . .
. . . 8 8 8 9 9 9 9 8 8 8 . . .
. . . 8 8 8 9 9 9 9 8 8 8 . . .
. . . . . 8 8 8 8 8 8 . . . . .
. . . . . a a . . a a . . . . .
. . . . . a a . . a a . . . . .
. . . . d d d . . d d d . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_hero_walk1 = img`
. . . . . . 2 2 2 2 . . . . . .
. . . . . 2 2 2 2 2 2 . . . . .
. . . . 2 2 d d d d 2 2 . . . .
. . . . 2 d f 1 1 f d 2 . . . .
. . . . d d f 1 1 f d d . . . .
. . . . d d d d d d d d . . . .
. . . . . d d 2 2 d d . . . . .
. . . . 8 8 9 9 9 9 . . . . . .
. . . 8 8 8 9 9 9 9 8 . . . . .
. . . . 8 8 9 9 9 9 8 8 . . . .
. . . . . 8 8 8 8 8 . . . . . .
. . . . . a a . . a a . . . . .
. . . . a a . . . . a a . . . .
. . . d d d . . . . d d . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_hero_walk2 = img`
. . . . . . 2 2 2 2 . . . . . .
. . . . . 2 2 2 2 2 2 . . . . .
. . . . 2 2 d d d d 2 2 . . . .
. . . . 2 d f 1 1 f d 2 . . . .
. . . . d d f 1 1 f d d . . . .
. . . . d d d d d d d d . . . .
. . . . . d d 2 2 d d . . . . .
. . . . . . 9 9 9 9 8 8 . . . .
. . . . . 8 9 9 9 9 8 8 8 . . .
. . . . 8 8 9 9 9 9 8 8 . . . .
. . . . . . 8 8 8 8 8 . . . . .
. . . . . a a . . a a . . . . .
. . . . a a . . . . a a . . . .
. . . . d d . . . . d d d . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_hero_jump = img`
. . . . . . 2 2 2 2 . . . . . .
. . . . . 2 2 2 2 2 2 . . . . .
. . . . 2 2 d d d d 2 2 . . . .
. . . . 2 d f 1 1 f d 2 . . . .
. . . . d d f 1 1 f d d . . . .
. . . . d d d d d d d d . . . .
. . . . . d d 2 2 d d . . . . .
. . . . 8 8 9 9 9 9 8 8 . . . .
. . . 8 8 8 9 9 9 9 8 8 8 . . .
. . . . 8 8 9 9 9 9 8 8 . . . .
. . . . a a 8 8 8 8 a a . . . .
. . . a a . . . . . . a a . . .
. . d d . . . . . . . . d d . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_gem = img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . 9 9 . . . . . . .
. . . . . . 9 1 1 9 . . . . . .
. . . . . 9 1 1 1 1 9 . . . . .
. . . . 9 1 1 1 1 1 1 9 . . . .
. . . 9 9 9 9 9 9 9 9 9 9 . . .
. . . . 9 8 8 8 8 8 8 9 . . . .
. . . . . 9 8 8 8 8 9 . . . . .
. . . . . . 9 8 8 9 . . . . . .
. . . . . . . 9 9 . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_exit = img`
. . . . . . . . . . . . . . . .
. . . . . . 5 5 5 5 . . . . . .
. . . . . 5 5 5 5 5 5 . . . . .
. . . . 5 5 a a a a 5 5 . . . .
. . . . 5 a 2 f f 2 a 5 . . . .
. . . . 5 a 2 f f 2 a 5 . . . .
. . . . 5 5 a a a a 5 5 . . . .
. . . . . 5 5 5 5 5 5 . . . . .
. . . . 5 5 f f f f 5 5 . . . .
. . . 5 5 5 f f f f 5 5 5 . . .
. . . 5 . 5 5 5 5 5 5 . 5 . . .
. . . . . 5 5 5 5 5 5 . . . . .
. . . . 5 5 . . . . 5 5 . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_coconut = img`
. . d d d d . .
. d d d d d d .
d d f d d f d d
d d d d d d d d
d d d f f d d d
d d d d d d d d
. d d d d d d .
. . d d d d . .
`

let img_boss_projectile = img`
. . 2 2 2 2 . .
. 2 4 4 4 4 2 .
2 4 5 5 5 5 4 2
2 4 5 1 1 5 4 2
2 4 5 1 1 5 4 2
2 4 5 5 5 5 4 2
. 2 4 4 4 4 2 .
. . 2 2 2 2 . .
`

let img_crawler_walk1 = img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . 2 2 2 2 2 2 . . . . . .
. . . 2 f f f f f f 2 . . . . .
. . 2 f f f f f f f f 2 . . . .
. 2 2 2 f f 2 2 f f 2 2 2 . . .
. 2 f 2 f 2 f f 2 f 2 f 2 . . .
. 2 f 2 f f f f f f 2 f 2 . . .
. . 2 2 2 2 2 2 2 2 2 2 . . . .
. . . f . . f . . f . . . . . .
. . f . . f . . f . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_crawler_walk2 = img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . 2 2 2 2 2 2 . . . . . .
. . . 2 f f f f f f 2 . . . . .
. . 2 f f f f f f f f 2 . . . .
. 2 2 2 f f 2 2 f f 2 2 2 . . .
. 2 f 2 f 2 f f 2 f 2 f 2 . . .
. 2 f 2 f f f f f f 2 f 2 . . .
. . 2 2 2 2 2 2 2 2 2 2 . . . .
. . . . f . . f . . f . . . . .
. . . . . f . . f . . f . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_flyer_wingup = img`
. . . . . . . . . . . . . . . .
. a a . . . . . . . . . a a . .
a a a a . . . . . . . a a a a .
. a a a a . . . . . a a a a . .
. . a a a a a c a a a a a . . .
. . . a a c c f c c a a . . . .
. . . c c f 1 f 1 f c c . . . .
. . . c c f f f f f c c . . . .
. . . . c f f f f f c . . . . .
. . . . . c c c c c . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_flyer_wingdown = img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. a a . . . . . . . . . a a . .
a a a a a . . c . . a a a a a .
. a a a a a c f c a a a a a . .
. . a c c c f 1 f c c c a . . .
. . . c c f f f f f c c . . . .
. . . . c f f f f f c . . . . .
. . . . . c c c c c . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_hopper_idle = img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . 7 7 7 7 7 7 7 . . . . . .
. . 7 7 7 7 7 7 7 7 7 . . . . .
. 7 7 f 1 f 7 f 1 f 7 7 . . . .
. 7 7 f f f 7 f f f 7 7 . . . .
. 7 7 7 7 7 4 7 7 7 7 7 . . . .
. 7 7 7 7 4 4 4 7 7 7 7 . . . .
. . 7 7 7 7 7 7 7 7 7 . . . . .
. . . 7 d d d d d 7 . . . . . .
. . d d d d d d d d d . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_hopper_jump = img`
. . . . . . . . . . . . . . . .
. . . 7 7 7 7 7 7 7 . . . . . .
. . 7 7 7 7 7 7 7 7 7 . . . . .
. 7 7 f 1 f 7 f 1 f 7 7 . . . .
. 7 7 f f f 7 f f f 7 7 . . . .
. 7 7 7 7 7 4 7 7 7 7 7 . . . .
. . 7 7 7 4 4 4 7 7 7 . . . . .
. . . d 7 7 7 7 7 d . . . . . .
. . d d . . . . . d d . . . . .
. d d . . . . . . . d d . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_pu_feather = img`
. . . . . . . . . . . . . . . .
. . . . . . . . 1 . . . . . . .
. . . . . . . 1 9 1 . . . . . .
. . . . . . 1 9 9 1 . . . . . .
. . . . . . 1 9 9 1 . . . . . .
. . . . . 1 9 9 9 1 . . . . . .
. . . . 1 9 9 9 1 . . . . . . .
. . . . 1 9 9 1 . . . . . . . .
. . . 1 9 9 1 . . . . . . . . .
. . 1 9 9 1 . . . . . . . . . .
. 1 9 9 1 . . . . . . . . . . .
. 1 9 1 . . . . . . . . . . . .
. 1 1 . . . . . . . . . . . . .
. d . . . . . . . . . . . . . .
d . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_pu_boots = img`
. . . . . . . . . . . . . . . .
. . . . . . . 1 1 . . . . . . .
. . . 1 1 . . 1 2 1 . . . . . .
. . 1 2 2 1 1 1 2 2 1 . . . . .
. 1 2 2 2 2 1 2 2 2 2 1 . . . .
. 1 2 2 2 2 2 2 2 2 2 1 . . . .
. 1 2 2 2 2 2 2 2 2 2 1 . . . .
. . 1 1 2 2 2 2 2 1 1 . . . . .
. . . 1 2 2 2 2 2 1 . . . . . .
. . . 1 2 2 2 2 2 1 . . . . . .
. . . 1 d d d d d 1 . . . . . .
. . . 1 d 1 1 1 d 1 . . . . . .
. . . . 1 . . . 1 . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_pu_shield = img`
. . . . . . . . . . . . . . . .
. . . . . 5 5 5 5 5 . . . . . .
. . . . 5 5 5 1 5 5 5 . . . . .
. . . 5 5 5 1 1 1 5 5 5 . . . .
. . 5 5 5 1 1 5 1 1 5 5 5 . . .
. 5 5 5 1 1 5 5 5 1 1 5 5 5 . .
. 5 5 5 1 1 5 5 5 1 1 5 5 5 . .
. 5 5 5 1 1 5 5 5 1 1 5 5 5 . .
. . 5 5 5 1 1 5 1 1 5 5 5 . . .
. . . 5 5 5 1 1 1 5 5 5 . . . .
. . . . 5 5 5 1 5 5 5 . . . . .
. . . . . 5 5 5 5 5 . . . . . .
. . . . . . 5 5 5 . . . . . . .
. . . . . . . 5 . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_pu_triple = img`
. . . . . . . . . . . . . . . .
. . . . . 4 4 4 4 . . . . . . .
. . . . 4 5 5 5 5 4 . . . . . .
. . 4 4 5 5 2 2 5 5 4 4 . . . .
. 4 5 5 5 2 2 2 2 5 5 5 4 . . .
. 4 5 5 2 2 f f 2 2 5 5 4 . . .
. . 4 4 2 2 f f 2 2 4 4 . . . .
. . . . 4 2 2 2 2 4 . . . . . .
. . . . . 4 4 4 4 . . . . . . .
. . . . . . d d . . . . . . . .
. . . . . . d d . . . . . . . .
. . . . . d d d d . . . . . . .
. . . . d d . . d d . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`

let img_boss = img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . d d d d d d d d d d d . . . . . . . . . . .
. . . . . . . . d d b b b b b b b b b b b d d . . . . . . . . .
. . . . . . . d b b b b b b b b b b b b b b b d . . . . . . . .
. . . . . . d b b f f f f b b b f f f f b b b d . . . . . . . .
. . . . . . d b f 2 2 2 2 f b f 2 2 2 2 f b b d . . . . . . . .
. . . . . d b f 2 2 f f 2 2 f 2 2 f f 2 2 f b b d . . . . . . .
. . . . . d b f 2 f . . f 2 f 2 f . . f 2 f b b d . . . . . . .
. . . . . d b f 2 f . . f 2 f 2 f . . f 2 f b b d . . . . . . .
. . . . . d b f 2 2 f f 2 2 f 2 2 f f 2 2 f b b d . . . . . . .
. . . . . d b b f 2 2 2 2 f b f 2 2 2 2 f b b b d . . . . . . .
. . . . . d b b b f f f f b b b f f f f b b b b d . . . . . . .
. . . . . d b b b b b b b b b b b b b b b b b b d . . . . . . .
. . . . . d b b b b b b b b b b b b b b b b b b d . . . . . . .
. . . . . d b b b b b f f f f f f f b b b b b b d . . . . . . .
. . . . . d b b b b f b b b b b b b f b b b b b d . . . . . . .
. . . . . d b b b f b b b b b b b b b f b b b b d . . . . . . .
. . . . . d b b b f b f f f f f f f b f b b b b d . . . . . . .
. . . . . d b b b f b b b b b b b b b f b b b b d . . . . . . .
. . . . . d b b b b f b b b b b b b f b b b b b d . . . . . . .
. . . . . d b b b b b f f f f f f f b b b b b b d . . . . . . .
. . . . . d b b b b b b b b b b b b b b b b b b d . . . . . . .
. . . . . d b b b b b b b b b b b b b b b b b b d . . . . . . .
. . . . . . d b b b b b b b b b b b b b b b b d . . . . . . . .
. . . . . . d d b b b b b b b b b b b b b b d d . . . . . . . .
. . . . . . . d d d d d d d d d d d d d d d d . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
`

// ---------- 🔧 ENGINE SETUP ----------

// Custom Sprite Kinds (prefixed to avoid namespace clashes)
let SpriteKind_Obstacle = SpriteKind.create()
let SpriteKind_Goal = SpriteKind.create()
let SpriteKind_Item = SpriteKind.create()
let SpriteKind_PowerUp = SpriteKind.create()
let SpriteKind_Boss = SpriteKind.create()
let SpriteKind_BossProjectile = SpriteKind.create()

// Global state variables
let state = "title"
let stateTime = 0

let hero: Sprite = null
let oldX = 0
let oldY = 0
let onGround = false
let lastTimeOnGround = 0
let jumpsCount = 0
let heroDirection = 1

let currentLevel = 0
let currentLevelWidth = 0
let currentLevelHeight = 0

let levelGemsCount = 0
let levelGemsCollected = 0

let powerupActive = false
let activePowerupType = ""
let powerupTimer = 0

let playerStartX = 0
let playerStartY = 0
let lastHitTime = 0

let bossSprite: Sprite = null
let bossHp = BOSS_MAX_HP
let bossActive = false
let lastBossAttackTime = 0

// ---------- 🔧 ENGINE FUNCTION DECLARATIONS (Defined first to resolve hoisting) ----------

function changeState(newState: string) {
    state = newState
    stateTime = control.millis()
}

function mirrorImage(src: Image): Image {
    let w = src.width
    let h = src.height
    let dest = image.create(w, h)
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            dest.setPixel(w - 1 - x, y, src.getPixel(x, y))
        }
    }
    return dest
}

// Generate mirrored sprites
let img_hero_idle_left = mirrorImage(img_hero_idle)
let img_hero_walk1_left = mirrorImage(img_hero_walk1)
let img_hero_walk2_left = mirrorImage(img_hero_walk2)
let img_hero_jump_left = mirrorImage(img_hero_jump)
let img_crawler_walk1_left = mirrorImage(img_crawler_walk1)
let img_crawler_walk2_left = mirrorImage(img_crawler_walk2)
let img_flyer_wingup_left = mirrorImage(img_flyer_wingup)
let img_flyer_wingdown_left = mirrorImage(img_flyer_wingdown)
let img_hopper_idle_left = mirrorImage(img_hopper_idle)
let img_hopper_jump_left = mirrorImage(img_hopper_jump)

function spawnPlayer(x: number, y: number) {
    hero = sprites.create(img_hero_idle, SpriteKind.Player)
    hero.setPosition(x, y)
    hero.ay = GRAVITY
    controller.moveSprite(hero, NORMAL_MOVE_SPEED, 0)
    heroDirection = 1
    oldX = x
    oldY = y
    jumpsCount = 0
    playerStartX = x
    playerStartY = y
}

function spawnGem(x: number, y: number) {
    let gem = sprites.create(img_gem, SpriteKind_Item)
    gem.setPosition(x, y)
    levelGemsCount++
}

function spawnCrawler(x: number, y: number) {
    let crawler = sprites.create(img_crawler_walk1, SpriteKind.Enemy)
    crawler.setPosition(x, y)
    crawler.data["type"] = "crawler"
    crawler.vx = -30
}

function spawnFlyer(x: number, y: number) {
    let flyer = sprites.create(img_flyer_wingup, SpriteKind.Enemy)
    flyer.setPosition(x, y)
    flyer.data["type"] = "flyer"
    flyer.data["startX"] = x
    flyer.data["startY"] = y
    flyer.data["spawnTime"] = control.millis()
    flyer.data["dir"] = 1
    flyer.data["speed"] = 25
}

function spawnHopper(x: number, y: number) {
    let hopper = sprites.create(img_hopper_idle, SpriteKind.Enemy)
    hopper.setPosition(x, y)
    hopper.data["type"] = "hopper"
    hopper.data["lastJumpTime"] = control.millis()
    hopper.ay = 400
}

function spawnPowerup(x: number, y: number, levelNum: number, powerupIndex: number) {
    let type = ""
    let img: Image = null
    if (levelNum === 0) {
        type = "feather"
        img = img_pu_feather
    } else if (levelNum === 1) {
        type = "boots"
        img = img_pu_boots
    } else {
        if (powerupIndex === 0) {
            type = "shield"
            img = img_pu_shield
        } else {
            type = "triple"
            img = img_pu_triple
        }
    }
    let pu = sprites.create(img, SpriteKind_PowerUp)
    pu.setPosition(x, y)
    pu.data["powerupType"] = type
}

function spawnExit(x: number, y: number) {
    let goal = sprites.create(img_exit, SpriteKind_Goal)
    goal.setPosition(x, y)
}

function spawnBoss(x: number, y: number) {
    bossSprite = sprites.create(img_boss, SpriteKind_Boss)
    bossSprite.setPosition(x, y)
    bossHp = BOSS_MAX_HP
    bossActive = true
    lastBossAttackTime = control.millis()
}

function loadLevel(levelNum: number) {
    let kindsToDestroy = [
        SpriteKind.Player, SpriteKind_Obstacle, SpriteKind.Enemy,
        SpriteKind.Projectile, SpriteKind_BossProjectile, SpriteKind_Item,
        SpriteKind_PowerUp, SpriteKind_Goal, SpriteKind_Boss
    ]
    for (let kind of kindsToDestroy) {
        for (let s of sprites.allOfKind(kind)) {
            s.destroy()
        }
    }
    bossSprite = null
    
    let map = LEVELS[levelNum]
    let rows = map.length
    let cols = map[0].length
    currentLevelWidth = cols * 16
    currentLevelHeight = rows * 16
    
    levelGemsCount = 0
    levelGemsCollected = 0
    powerupActive = false
    activePowerupType = ""
    powerupTimer = 0
    bossActive = false
    lastHitTime = 0
    
    // Parse map and merge consecutive wall blocks to optimize sprite budget
    for (let r = 0; r < rows; r++) {
        let c = 0;
        while (c < cols) {
            if (map[r].charAt(c) === 'X') {
                let startC = c
                while (c < cols && map[r].charAt(c) === 'X') {
                    c++
                }
                let count = c - startC
                let wallImg = image.create(count * 16, 16)
                for (let i = 0; i < count; i++) {
                    wallImg.drawImage(img_wall, i * 16, 0)
                }
                let wall = sprites.create(wallImg, SpriteKind_Obstacle)
                wall.left = startC * 16
                wall.top = r * 16
            } else {
                c++
            }
        }
    }
    
    // Spawn non-wall entities
    let powerupIndex = 0
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let char = map[r].charAt(c)
            let x = c * 16 + 8
            let y = r * 16 + 8
            if (char === '@') {
                spawnPlayer(x, y)
            } else if (char === 'g') {
                spawnGem(x, y)
            } else if (char === 'e') {
                spawnCrawler(x, y)
            } else if (char === 'f') {
                spawnFlyer(x, y)
            } else if (char === 'h') {
                spawnHopper(x, y)
            } else if (char === 'P') {
                spawnPowerup(x, y, levelNum, powerupIndex)
                powerupIndex++
            } else if (char === 'F') {
                if (levelNum !== 2) {
                    spawnExit(x, y)
                }
            }
        }
    }
    
    if (levelNum === 2) {
        spawnBoss(currentLevelWidth - 60, 64)
    }
    
    // Set background colors based on environments
    if (levelNum === 0) {
        scene.setBackgroundColor(13) // Light Tan Ruins
    } else if (levelNum === 1) {
        scene.setBackgroundColor(6)  // Dark Green Jungle Canopy
    } else {
        scene.setBackgroundColor(11) // Dark Purple Deep Temple
    }
}

function throwCoconut(dir: number, vyAngle: number) {
    let coconut = sprites.create(img_coconut, SpriteKind.Projectile)
    coconut.setPosition(hero.x + dir * 8, hero.y)
    coconut.vx = dir * COCONUT_SPEED
    coconut.vy = vyAngle
    coconut.ay = 200
    coconut.setFlag(SpriteFlag.AutoDestroy, true)
    music.pewPew.play()
}

function playerHitBy(enemy: Sprite) {
    let now = control.millis()
    if (now - lastHitTime < INVINCIBILITY_IFRAMES_MS) return
    if (activePowerupType === "shield") return
    
    lastHitTime = now
    info.changeLifeBy(-1)
    music.zapped.play()
    scene.cameraShake(4, 300)
    
    if (enemy) {
        hero.vx = (hero.x < enemy.x) ? -120 : 120
        hero.vy = -80
    }
}

function damageBoss() {
    if (!bossActive || !bossSprite) return
    
    bossHp -= 1
    music.knock.play()
    bossSprite.startEffect(effects.fire, 150)
    scene.cameraShake(4, 200)
    
    if (bossHp <= 0) {
        bossActive = false
        bossSprite.destroy(effects.confetti, 800)
        bossSprite = null
        music.powerUp.play()
        info.changeScoreBy(SCORE_LEVEL_CLEAR * 2)
        
        // Spawn exit idol at boss arena center
        spawnExit(currentLevelWidth - 60, 64)
        game.splash("GUARDIAN DEFEATED!", "The exit idol has appeared!")
    }
}

// ---------- 🎮 EVENT BINDINGS (Linear registration) ----------

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state === "playing") {
        heroDirection = 1
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state === "playing") {
        heroDirection = -1
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state === "title") {
        changeState("playing")
        info.setLife(START_LIVES)
        info.setScore(0)
        currentLevel = 0
        loadLevel(currentLevel)
        return
    }
    
    if (state === "playing" && hero) {
        if (control.millis() - stateTime < 200) return
        
        let canCoyote = (control.millis() - lastTimeOnGround < COYOTE_TIME_MS) && jumpsCount === 0
        
        if (onGround || canCoyote) {
            hero.vy = JUMP_VELOCITY
            jumpsCount = 1
            music.jumpUp.play()
        } else if (activePowerupType === "feather" && jumpsCount < 2) {
            hero.vy = DOUBLE_JUMP_VELOCITY
            jumpsCount = 2
            music.jumpUp.play()
        }
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state !== "playing" || !hero) return
    
    if (activePowerupType === "triple") {
        throwCoconut(heroDirection, 0)
        throwCoconut(heroDirection, -45)
        throwCoconut(heroDirection, 45)
    } else {
        throwCoconut(heroDirection, 0)
    }
})

// ---------- 🤝 OVERLAPS AND COLLISIONS ----------

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (p, e) {
    if (hero.vy > 0 && hero.bottom <= e.y + 4) {
        e.destroy(effects.disintegrate, 200)
        hero.vy = -130
        info.changeScoreBy(SCORE_GEM)
        music.jumpUp.play()
        scene.cameraShake(2, 100)
    } else {
        playerHitBy(e)
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind_Boss, function (p, b) {
    if (hero.vy > 0 && hero.bottom <= b.y - 8) {
        damageBoss()
        hero.vy = -130
    } else {
        playerHitBy(b)
    }
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind_Obstacle, function (proj, wall) {
    proj.destroy(effects.disintegrate, 100)
    music.smallCrash.play()
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (proj, e) {
    proj.destroy()
    e.destroy(effects.fire, 200)
    info.changeScoreBy(SCORE_GEM)
    music.smallCrash.play()
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind_Boss, function (proj, b) {
    proj.destroy()
    damageBoss()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind_BossProjectile, function (p, bp) {
    bp.destroy()
    playerHitBy(bp)
})

sprites.onOverlap(SpriteKind_BossProjectile, SpriteKind_Obstacle, function (bp, wall) {
    bp.destroy()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind_Item, function (p, g) {
    g.destroy(effects.sparkle, 150)
    info.changeScoreBy(SCORE_GEM)
    music.baDing.play()
    levelGemsCollected++
})

sprites.onOverlap(SpriteKind.Player, SpriteKind_PowerUp, function (p, pu) {
    let type = pu.data["powerupType"]
    pu.destroy(effects.coolRadial, 300)
    music.powerUp.play()
    
    activePowerupType = type
    powerupActive = true
    powerupTimer = control.millis()
    
    let titleStr = ""
    let descStr = ""
    if (type === "feather") {
        titleStr = "DOUBLE JUMP!"
        descStr = "Jump in mid-air with A"
    } else if (type === "boots") {
        titleStr = "SPEED BOOTS!"
        descStr = "Sprint twice as fast"
        controller.moveSprite(hero, BOOTS_MOVE_SPEED, 0)
    } else if (type === "shield") {
        titleStr = "SHIELD ACTIVE!"
        descStr = "Immune to all damage"
    } else if (type === "triple") {
        titleStr = "TRIPLE THROW!"
        descStr = "Shoot 3 coconuts at once"
    }
    
    game.showLongText(titleStr + "\n" + descStr, DialogLayout.Bottom)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind_Goal, function (p, g) {
    music.powerUp.play()
    game.splash("LEVEL COMPLETE!")
    
    let bonus = 0
    if (levelGemsCollected >= levelGemsCount && levelGemsCount > 0) {
        bonus = SCORE_ALL_GEMS_BONUS
        info.changeScoreBy(bonus)
        game.splash("ALL GEMS BONUS!", "+" + bonus + " points!")
    }
    
    currentLevel++
    if (currentLevel < LEVELS.length) {
        loadLevel(currentLevel)
    } else {
        music.victory.play()
        let highscore = 0
        if (settings) {
            highscore = settings.readNumber("highscore") || 0
        }
        let score = info.score()
        let newHigh = false
        if (score > highscore) {
            if (settings) {
                settings.writeNumber("highscore", score)
            }
            highscore = score
            newHigh = true
        }
        
        if (newHigh) {
            game.splash("NEW HIGH SCORE!", "" + score)
        } else {
            game.splash("FINAL SCORE: " + score, "BEST SCORE: " + highscore)
        }
        game.over(true, effects.confetti)
    }
})

// ---------- 🔄 MAIN GAME RUNTIME LOOPS ----------

// Custom AABB Physics & Collision Resolution
game.onUpdate(function () {
    if (state !== "playing" || !hero) return
    
    let walls = sprites.allOfKind(SpriteKind_Obstacle)
    onGround = false
    
    // 1. Resolve Horizontal Overlaps (Temporarily lock Y to previous frame)
    let newX = hero.x
    let newY = hero.y
    hero.y = oldY
    for (let wall of walls) {
        if (hero.overlapsWith(wall)) {
            if (oldX < newX) { // Traveling Right
                hero.right = wall.left
            } else if (oldX > newX) { // Traveling Left
                hero.left = wall.right
            }
            hero.vx = 0
            newX = hero.x
        }
    }
    
    // 2. Resolve Vertical Overlaps (Restore new Y position)
    hero.y = newY
    for (let wall of walls) {
        if (hero.overlapsWith(wall)) {
            if (oldY < newY) { // Falling Down
                hero.bottom = wall.top
                hero.vy = 0
                onGround = true
                lastTimeOnGround = control.millis()
            } else if (oldY > newY) { // Jumping Up
                hero.top = wall.bottom
                hero.vy = 0
            }
        }
    }
    
    // Keep explorer within world bounds
    if (hero.left < 0) { hero.left = 0; hero.vx = 0 }
    if (hero.right > currentLevelWidth) { hero.right = currentLevelWidth; hero.vx = 0 }
    if (hero.top < 0) { hero.top = 0; hero.vy = 0 }
    
    // Death pit reset
    if (hero.top > currentLevelHeight) {
        playerHitBy(null)
        hero.setPosition(playerStartX, playerStartY)
        hero.vx = 0
        hero.vy = 0
    }
    
    // Cache current position for next frame
    oldX = hero.x
    oldY = hero.y
    
    // Smooth camera tracking within level boundaries
    let camX = Math.max(80, Math.min(currentLevelWidth - 80, hero.x))
    let camY = Math.max(60, Math.min(currentLevelHeight - 60, hero.y))
    scene.centerCameraAt(camX, camY)
})

// Animation states updates
let walkTimer = 0
let walkFrame = 0
game.onUpdate(function () {
    if (state !== "playing" || !hero) return
    
    let isMoving = controller.left.isPressed() || controller.right.isPressed()
    if (controller.left.isPressed()) {
        heroDirection = -1
    } else if (controller.right.isPressed()) {
        heroDirection = 1
    }
    
    if (onGround) {
        if (isMoving) {
            if (control.millis() - walkTimer > 150) {
                walkFrame = (walkFrame + 1) % 2
                walkTimer = control.millis()
            }
            if (heroDirection === 1) {
                hero.setImage(walkFrame === 0 ? img_hero_walk1 : img_hero_walk2)
            } else {
                hero.setImage(walkFrame === 0 ? img_hero_walk1_left : img_hero_walk2_left)
            }
        } else {
            hero.setImage(heroDirection === 1 ? img_hero_idle : img_hero_idle_left)
        }
    } else {
        hero.setImage(heroDirection === 1 ? img_hero_jump : img_hero_jump_left)
    }
})

// Enemy AI updates (Crawler, Flyer, Hopper)
game.onUpdate(function () {
    if (state !== "playing") return
    
    let now = control.millis()
    
    for (let enemy of sprites.allOfKind(SpriteKind.Enemy)) {
        let type = enemy.data["type"]
        if (type === "crawler") {
            let vx = enemy.vx
            if (vx === 0) {
                vx = -30
                enemy.vx = vx
            }
            
            // Turn on wall hits
            let hitWall = false
            for (let wall of sprites.allOfKind(SpriteKind_Obstacle)) {
                if (enemy.overlapsWith(wall)) {
                    if (vx > 0) {
                        enemy.right = wall.left
                        enemy.vx = -30
                    } else {
                        enemy.left = wall.right
                        enemy.vx = 30
                    }
                    hitWall = true
                    break
                }
            }
            
            // Turn before walking off ledges
            if (!hitWall) {
                let testX = enemy.x + (enemy.vx > 0 ? 8 : -8)
                let testY = enemy.bottom + 4
                let groundAhead = false
                for (let wall of sprites.allOfKind(SpriteKind_Obstacle)) {
                    if (testX >= wall.left && testX <= wall.right && testY >= wall.top && testY <= wall.bottom) {
                        groundAhead = true
                        break
                    }
                }
                if (!groundAhead) {
                    enemy.vx = -enemy.vx
                }
            }
            
            // Crawler pacing animations
            let step = (now / 200) % 2 === 0
            if (enemy.vx > 0) {
                enemy.setImage(step ? img_crawler_walk1_left : img_crawler_walk2_left)
            } else {
                enemy.setImage(step ? img_crawler_walk1 : img_crawler_walk2)
            }
            
        } else if (type === "flyer") {
            let startX = enemy.data["startX"]
            let startY = enemy.data["startY"]
            let speed = enemy.data["speed"]
            let age = now - enemy.data["spawnTime"]
            
            // Bob up and down on a sine curve
            enemy.y = startY + Math.sin(age / 250) * 16
            
            // Pace left/right within constraints
            let dist = enemy.x - startX
            if (Math.abs(dist) > 64) {
                enemy.data["dir"] = enemy.data["dir"] * -1
                enemy.x = startX + enemy.data["dir"] * 64
            }
            enemy.vx = enemy.data["dir"] * speed
            
            // Flutter wing animation
            let wing = (now / 150) % 2 === 0
            if (enemy.vx > 0) {
                enemy.setImage(wing ? img_flyer_wingup_left : img_flyer_wingdown_left)
            } else {
                enemy.setImage(wing ? img_flyer_wingup : img_flyer_wingdown)
            }
            
        } else if (type === "hopper") {
            let lastJump = enemy.data["lastJumpTime"]
            
            // Custom simplified floor physics resolver for hopper
            let onGroundHopper = false
            for (let wall of sprites.allOfKind(SpriteKind_Obstacle)) {
                if (enemy.overlapsWith(wall)) {
                    if (enemy.y < wall.y) {
                        enemy.bottom = wall.top
                        enemy.vy = 0
                        onGroundHopper = true
                    }
                }
            }
            
            if (onGroundHopper) {
                enemy.vx = 0
                if (now - lastJump > 2200) {
                    enemy.data["lastJumpTime"] = now
                    let jumpDir = hero.x > enemy.x ? 1 : -1
                    enemy.vy = -120
                    enemy.vx = jumpDir * 40
                }
                enemy.setImage(hero.x > enemy.x ? img_hopper_idle_left : img_hopper_idle)
            } else {
                enemy.setImage(hero.x > enemy.x ? img_hopper_jump_left : img_hopper_jump)
            }
        }
    }
})

// Temple Guardian Boss updates (Floating and throwing fireballs)
game.onUpdate(function () {
    if (state !== "playing" || !bossActive || !bossSprite) return
    
    let now = control.millis()
    
    // Float slowly
    bossSprite.y = 64 + Math.sin(now / 500) * 16
    
    // Throw fireballs targeting the player
    if (now - lastBossAttackTime > 2000) {
        lastBossAttackTime = now
        let fireball = sprites.create(img_boss_projectile, SpriteKind_BossProjectile)
        fireball.setPosition(bossSprite.x - 16, bossSprite.y)
        
        let dx = hero.x - bossSprite.x
        let dy = hero.y - bossSprite.y
        let dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 0) {
            fireball.vx = (dx / dist) * BOSS_PROJECTILE_SPEED
            fireball.vy = (dy / dist) * BOSS_PROJECTILE_SPEED
        } else {
            fireball.vx = -BOSS_PROJECTILE_SPEED
            fireball.vy = 0
        }
        fireball.setFlag(SpriteFlag.AutoDestroy, true)
        music.pewPew.play()
    }
})

// Damage flashing / Invincibility i-frames / power-up active timers
game.onUpdate(function () {
    if (state !== "playing") return
    
    let now = control.millis()
    
    // i-frame flashing
    let elapsedHit = now - lastHitTime
    if (elapsedHit < INVINCIBILITY_IFRAMES_MS) {
        if (hero) {
            hero.setFlag(SpriteFlag.Invisible, (elapsedHit % 200) < 100)
        }
    } else {
        if (hero) {
            hero.setFlag(SpriteFlag.Invisible, false)
        }
    }
    
    // Power-up expiration
    if (powerupActive) {
        let elapsedPower = now - powerupTimer
        if (elapsedPower > POWERUP_DURATION_MS) {
            powerupActive = false
            if (activePowerupType === "boots") {
                if (hero) {
                    controller.moveSprite(hero, NORMAL_MOVE_SPEED, 0)
                }
            }
            activePowerupType = ""
            music.spook.play()
        }
    }
})

// ---------- 🎨 SCREEN PAINT DRAWINGS (HUD & UI) ----------

game.onPaint(function () {
    if (state === "title") {
        screen.fill(13)
        screen.printCenter("JUNGLE QUEST", 30, 2, image.font12)
        screen.printCenter("AA8 STEM Adventure", 50, 15, image.font8)
        
        // Decorative tiles
        screen.drawImage(img_gem, 40, 70)
        screen.drawImage(img_exit, 104, 70)
        
        let flash = (control.millis() / 500) % 2 === 0
        if (flash) {
            screen.printCenter("PRESS A TO START", 96, 1, image.font8)
        }
        return
    }
    
    if (state === "playing") {
        // Draw Power-up Bar
        if (powerupActive) {
            let elapsed = control.millis() - powerupTimer
            let remaining = Math.max(0, POWERUP_DURATION_MS - elapsed)
            let pct = remaining / POWERUP_DURATION_MS
            let barWidth = Math.floor(pct * 40)
            
            let label = activePowerupType.toUpperCase()
            screen.print(label, 60, 4, 5)
            
            screen.drawRect(60, 12, 42, 5, 1)
            screen.fillRect(61, 13, barWidth, 3, 5)
        }
        
        // Draw Boss HP
        if (bossActive && bossSprite) {
            let x = 40
            let y = 22
            let w = 80
            let h = 5
            
            screen.printCenter("TEMPLE GUARDIAN", 12, 2, image.font8)
            screen.drawRect(x, y, w + 2, h + 2, 1)
            let fillW = Math.floor((bossHp / BOSS_MAX_HP) * w)
            screen.fillRect(x + 1, y + 1, fillW, h, 2)
        }
    }
})

// Initialize the title state
changeState("title")
