# GameBeliever 图片路由文档

## 基础信息

| 项目 | 值 |
|------|-----|
| 域名 | `https://gamebeliever.top` |
| 图片路径格式 | `/images/characters/{slug}/{type}.webp` |
| 图片格式 | WebP |
| 服务器存储路径 | `/home/GameBeliever/dist/images/characters/` |

## 图片类型

| 文件名 | 说明 | 用途 | 尺寸建议 |
|--------|------|------|----------|
| `card.webp` | 角色卡片图 | 头像、列表展示 | 200x200 |
| `full.webp` | 角色全身图 | 详情页展示 | 800x1200 |

## 前端使用方式

### 工具函数

```javascript
/**
 * 获取角色图片 URL
 * @param {string} slug - 角色 slug 标识
 * @param {'card' | 'full'} type - 图片类型
 * @returns {string} 图片完整 URL
 */
const getCharacterImage = (slug, type = 'card') => {
  return `https://gamebeliever.top/images/characters/${slug}/${type}.webp`
}

// 使用示例
getCharacterImage('acheron', 'card')  // 卡片图
getCharacterImage('acheron', 'full')  // 全身图
```

### Vue 组件示例

```vue
<template>
  <img :src="getCharacterImage(character.slug, 'card')" :alt="character.name" />
</template>

<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const getCharacterImage = (slug, type = 'card') => {
  return `https://gamebeliever.top/images/characters/${slug}/${type}.webp`
}
</script>
```

## 完整角色图片路由表 (90个角色)

| # | Slug | 卡片图 | 全身图 |
|---|------|--------|--------|
| 1 | acheron | `/images/characters/acheron/card.webp` | `/images/characters/acheron/full.webp` |
| 2 | aglaea | `/images/characters/aglaea/card.webp` | `/images/characters/aglaea/full.webp` |
| 3 | anaxa | `/images/characters/anaxa/card.webp` | `/images/characters/anaxa/full.webp` |
| 4 | archer | `/images/characters/archer/card.webp` | `/images/characters/archer/full.webp` |
| 5 | argenti | `/images/characters/argenti/card.webp` | `/images/characters/argenti/full.webp` |
| 6 | arlan | `/images/characters/arlan/card.webp` | `/images/characters/arlan/full.webp` |
| 7 | ashveil | `/images/characters/ashveil/card.webp` | `/images/characters/ashveil/full.webp` |
| 8 | asta | `/images/characters/asta/card.webp` | `/images/characters/asta/full.webp` |
| 9 | aventurine | `/images/characters/aventurine/card.webp` | `/images/characters/aventurine/full.webp` |
| 10 | bailu | `/images/characters/bailu/card.webp` | `/images/characters/bailu/full.webp` |
| 11 | black-swan | `/images/characters/black-swan/card.webp` | `/images/characters/black-swan/full.webp` |
| 12 | blade | `/images/characters/blade/card.webp` | `/images/characters/blade/full.webp` |
| 13 | blade-mortenax | `/images/characters/blade-mortenax/card.webp` | `/images/characters/blade-mortenax/full.webp` |
| 14 | boothill | `/images/characters/boothill/card.webp` | `/images/characters/boothill/full.webp` |
| 15 | bronya | `/images/characters/bronya/card.webp` | `/images/characters/bronya/full.webp` |
| 16 | castorice | `/images/characters/castorice/card.webp` | `/images/characters/castorice/full.webp` |
| 17 | cerydra | `/images/characters/cerydra/card.webp` | `/images/characters/cerydra/full.webp` |
| 18 | cipher | `/images/characters/cipher/card.webp` | `/images/characters/cipher/full.webp` |
| 19 | clara | `/images/characters/clara/card.webp` | `/images/characters/clara/full.webp` |
| 20 | cyrene | `/images/characters/cyrene/card.webp` | `/images/characters/cyrene/full.webp` |
| 21 | dan-heng | `/images/characters/dan-heng/card.webp` | `/images/characters/dan-heng/full.webp` |
| 22 | dan-heng-permansor-terrae | `/images/characters/dan-heng-permansor-terrae/card.webp` | `/images/characters/dan-heng-permansor-terrae/full.webp` |
| 23 | dr-ratio | `/images/characters/dr-ratio/card.webp` | `/images/characters/dr-ratio/full.webp` |
| 24 | evanescia | `/images/characters/evanescia/card.webp` | `/images/characters/evanescia/full.webp` |
| 25 | feixiao | `/images/characters/feixiao/card.webp` | `/images/characters/feixiao/full.webp` |
| 26 | firefly | `/images/characters/firefly/card.webp` | `/images/characters/firefly/full.webp` |
| 27 | fu-xuan | `/images/characters/fu-xuan/card.webp` | `/images/characters/fu-xuan/full.webp` |
| 28 | gallagher | `/images/characters/gallagher/card.webp` | `/images/characters/gallagher/full.webp` |
| 29 | gepard | `/images/characters/gepard/card.webp` | `/images/characters/gepard/full.webp` |
| 30 | gilgamesh | `/images/characters/gilgamesh/card.webp` | `/images/characters/gilgamesh/full.webp` |
| 31 | guinaifen | `/images/characters/guinaifen/card.webp` | `/images/characters/guinaifen/full.webp` |
| 32 | hanya | `/images/characters/hanya/card.webp` | `/images/characters/hanya/full.webp` |
| 33 | herta | `/images/characters/herta/card.webp` | `/images/characters/herta/full.webp` |
| 34 | himeko | `/images/characters/himeko/card.webp` | `/images/characters/himeko/full.webp` |
| 35 | himeko-nova | `/images/characters/himeko-nova/card.webp` | `/images/characters/himeko-nova/full.webp` |
| 36 | hook | `/images/characters/hook/card.webp` | `/images/characters/hook/full.webp` |
| 37 | huohuo | `/images/characters/huohuo/card.webp` | `/images/characters/huohuo/full.webp` |
| 38 | hyacine | `/images/characters/hyacine/card.webp` | `/images/characters/hyacine/full.webp` |
| 39 | hysilens | `/images/characters/hysilens/card.webp` | `/images/characters/hysilens/full.webp` |
| 40 | imbibitor-lunae | `/images/characters/imbibitor-lunae/card.webp` | `/images/characters/imbibitor-lunae/full.webp` |
| 41 | jade | `/images/characters/jade/card.webp` | `/images/characters/jade/full.webp` |
| 42 | jiaoqiu | `/images/characters/jiaoqiu/card.webp` | `/images/characters/jiaoqiu/full.webp` |
| 43 | jing-yuan | `/images/characters/jing-yuan/card.webp` | `/images/characters/jing-yuan/full.webp` |
| 44 | jingliu | `/images/characters/jingliu/card.webp` | `/images/characters/jingliu/full.webp` |
| 45 | kafka | `/images/characters/kafka/card.webp` | `/images/characters/kafka/full.webp` |
| 46 | lingsha | `/images/characters/lingsha/card.webp` | `/images/characters/lingsha/full.webp` |
| 47 | luka | `/images/characters/luka/card.webp` | `/images/characters/luka/full.webp` |
| 48 | luocha | `/images/characters/luocha/card.webp` | `/images/characters/luocha/full.webp` |
| 49 | lynx | `/images/characters/lynx/card.webp` | `/images/characters/lynx/full.webp` |
| 50 | march-7th | `/images/characters/march-7th/card.webp` | `/images/characters/march-7th/full.webp` |
| 51 | march-7th-evernight | `/images/characters/march-7th-evernight/card.webp` | `/images/characters/march-7th-evernight/full.webp` |
| 52 | march-7th-swordmaster | `/images/characters/march-7th-swordmaster/card.webp` | `/images/characters/march-7th-swordmaster/full.webp` |
| 53 | misha | `/images/characters/misha/card.webp` | `/images/characters/misha/full.webp` |
| 54 | moze | `/images/characters/moze/card.webp` | `/images/characters/moze/full.webp` |
| 55 | mydei | `/images/characters/mydei/card.webp` | `/images/characters/mydei/full.webp` |
| 56 | natasha | `/images/characters/natasha/card.webp` | `/images/characters/natasha/full.webp` |
| 57 | pela | `/images/characters/pela/card.webp` | `/images/characters/pela/full.webp` |
| 58 | phainon | `/images/characters/phainon/card.webp` | `/images/characters/phainon/full.webp` |
| 59 | qingque | `/images/characters/qingque/card.webp` | `/images/characters/qingque/full.webp` |
| 60 | rappa | `/images/characters/rappa/card.webp` | `/images/characters/rappa/full.webp` |
| 61 | rin-tohsaka | `/images/characters/rin-tohsaka/card.webp` | `/images/characters/rin-tohsaka/full.webp` |
| 62 | robin | `/images/characters/robin/card.webp` | `/images/characters/robin/full.webp` |
| 63 | ruan-mei | `/images/characters/ruan-mei/card.webp` | `/images/characters/ruan-mei/full.webp` |
| 64 | saber | `/images/characters/saber/card.webp` | `/images/characters/saber/full.webp` |
| 65 | sampo | `/images/characters/sampo/card.webp` | `/images/characters/sampo/full.webp` |
| 66 | seele | `/images/characters/seele/card.webp` | `/images/characters/seele/full.webp` |
| 67 | serval | `/images/characters/serval/card.webp` | `/images/characters/serval/full.webp` |
| 68 | silver-wolf | `/images/characters/silver-wolf/card.webp` | `/images/characters/silver-wolf/full.webp` |
| 69 | silver-wolf-lv-999 | `/images/characters/silver-wolf-lv-999/card.webp` | `/images/characters/silver-wolf-lv-999/full.webp` |
| 70 | sparkle | `/images/characters/sparkle/card.webp` | `/images/characters/sparkle/full.webp` |
| 71 | sparxie | `/images/characters/sparxie/card.webp` | `/images/characters/sparxie/full.webp` |
| 72 | sunday | `/images/characters/sunday/card.webp` | `/images/characters/sunday/full.webp` |
| 73 | sushang | `/images/characters/sushang/card.webp` | `/images/characters/sushang/full.webp` |
| 74 | the-dahlia | `/images/characters/the-dahlia/card.webp` | `/images/characters/the-dahlia/full.webp` |
| 75 | the-herta | `/images/characters/the-herta/card.webp` | `/images/characters/the-herta/full.webp` |
| 76 | tingyun | `/images/characters/tingyun/card.webp` | `/images/characters/tingyun/full.webp` |
| 77 | tingyun-fugue | `/images/characters/tingyun-fugue/card.webp` | `/images/characters/tingyun-fugue/full.webp` |
| 78 | topaz | `/images/characters/topaz/card.webp` | `/images/characters/topaz/full.webp` |
| 79 | trailblazer-destruction | `/images/characters/trailblazer-destruction/card.webp` | `/images/characters/trailblazer-destruction/full.webp` |
| 80 | trailblazer-elation | `/images/characters/trailblazer-elation/card.webp` | `/images/characters/trailblazer-elation/full.webp` |
| 81 | trailblazer-harmony | `/images/characters/trailblazer-harmony/card.webp` | `/images/characters/trailblazer-harmony/full.webp` |
| 82 | trailblazer-preservation | `/images/characters/trailblazer-preservation/card.webp` | `/images/characters/trailblazer-preservation/full.webp` |
| 83 | trailblazer-remembrance | `/images/characters/trailblazer-remembrance/card.webp` | `/images/characters/trailblazer-remembrance/full.webp` |
| 84 | tribbie | `/images/characters/tribbie/card.webp` | `/images/characters/tribbie/full.webp` |
| 85 | welt | `/images/characters/welt/card.webp` | `/images/characters/welt/full.webp` |
| 86 | xueyi | `/images/characters/xueyi/card.webp` | `/images/characters/xueyi/full.webp` |
| 87 | yanqing | `/images/characters/yanqing/card.webp` | `/images/characters/yanqing/full.webp` |
| 88 | yao-guang | `/images/characters/yao-guang/card.webp` | `/images/characters/yao-guang/full.webp` |
| 89 | yukong | `/images/characters/yukong/card.webp` | `/images/characters/yukong/full.webp` |
| 90 | yunli | `/images/characters/yunli/card.webp` | `/images/characters/yunli/full.webp` |

## 测试链接

- ✅ https://gamebeliever.top/images/characters/acheron/card.webp
- ✅ https://gamebeliever.top/images/characters/acheron/full.webp
- ✅ https://gamebeliever.top/images/characters/kafka/card.webp
- ✅ https://gamebeliever.top/images/characters/firefly/full.webp

## 注意事项

1. 所有图片格式为 WebP，具有更好的压缩率
2. 图片通过 CDN (nginx) 直接提供，无需额外处理
3. 建议前端使用懒加载优化图片加载性能
4. 图片 slug 与角色数据中的 slug 字段对应

---

*文档生成时间: 2026-06-14*
*数据来源: prydwen.gg*
