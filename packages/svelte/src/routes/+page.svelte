<script lang="ts">
  import { manifest } from '$lib/manifest.js';

  // 懒加载所有图标组件（key 为相对路径），使用 eager: true 让首屏可直接渲染
  const modules = import.meta.glob('$lib/components/*.svelte', { eager: true }) as Record<
    string,
    { default: any }
  >;

  // stem -> Component 映射
  const componentMap: Record<string, any> = {};
  for (const [path, mod] of Object.entries(modules)) {
    const match = path.match(/components\/(.+)\.svelte$/);
    if (match) {
      componentMap[match[1]] = mod.default;
    }
  }

  let keyword = $state('');
  let size = $state(28);
  let color = $state('#0052D9'); // 通过 currentColor 控制：filled 的 fill 与 outlined 的 stroke
  let useFillColor = $state(false); // 是否额外指定 fillColor（双色 outlined 的填充 / filled 的填充）
  let fillColor = $state('#0052D9');
  let bg = $state('#ffffff');
  let onlyFilled = $state(false);
  let onlyOutlined = $state(false);

  const total = manifest.length;

  const list = $derived.by(() => {
    const kw = keyword.trim().toLowerCase();
    return manifest.filter(({ stem, icon }) => {
      if (onlyFilled && !stem.endsWith('-filled')) return false;
      if (onlyOutlined && stem.endsWith('-filled')) return false;
      if (!kw) return true;
      return (
        stem.toLowerCase().includes(kw) || icon.toLowerCase().includes(kw)
      );
    });
  });

  let toast = $state('');
  let toastTimer: any = null;
  function showToast(msg: string) {
    toast = msg;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), 1600);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`已复制：${text}`);
    } catch {
      showToast('复制失败');
    }
  }
</script>

<svelte:head>
  <title>TDesign Icons · Svelte 预览</title>
</svelte:head>

<div class="page" style:background={bg}>
  <header class="hero">
    <div class="hero-inner">
      <h1>TDesign Icons <span class="badge">Svelte</span></h1>
      <p class="subtitle">
        共 <b>{total}</b> 个图标，当前匹配 <b>{list.length}</b> 个。点击图标可复制组件名 / kebab 名。
      </p>

      <div class="toolbar">
        <input
          class="search"
          type="text"
          placeholder="搜索图标名称，例如：check / arrow / user-filled"
          bind:value={keyword}
        />

        <label class="ctrl">
          <span>尺寸</span>
          <input type="range" min="16" max="64" step="2" bind:value={size} />
          <i>{size}px</i>
        </label>

        <label class="ctrl">
          <span>主色</span>
          <input type="color" bind:value={color} />
        </label>

        <label class="chk">
          <input type="checkbox" bind:checked={useFillColor} />
          指定 fillColor
        </label>

        <label class="ctrl" class:disabled={!useFillColor}>
          <span>填充</span>
          <input type="color" bind:value={fillColor} disabled={!useFillColor} />
        </label>

        <label class="ctrl">
          <span>背景</span>
          <input type="color" bind:value={bg} />
        </label>

        <label class="chk">
          <input type="checkbox" bind:checked={onlyFilled} disabled={onlyOutlined} />
          仅 filled
        </label>
        <label class="chk">
          <input type="checkbox" bind:checked={onlyOutlined} disabled={onlyFilled} />
          仅 outlined
        </label>
      </div>
    </div>
  </header>

  <main class="grid">
    {#each list as { stem, icon } (stem)}
      {@const Cmp = componentMap[stem]}
      <button
        type="button"
        class="cell"
        title={`<${icon}Icon /> · ${stem}`}
        onclick={() => copy(`${icon}Icon`)}
        oncontextmenu={(e) => {
          e.preventDefault();
          copy(stem);
        }}
      >
        <div class="ico" style:font-size={`${size}px`} style:color={color}>
          {#if Cmp}
             <Cmp size={`${size}px`}  />
          {/if}
        </div>
        <div class="name">{stem}</div>
      </button>
    {/each}
  </main>

  {#if toast}
    <div class="toast">{toast}</div>
  {/if}
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
    background: #f5f7fa;
    color: #1f2329;
  }

  .page {
    min-height: 100vh;
    transition: background-color 0.2s ease;
  }

  .hero {
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: saturate(180%) blur(14px);
    background: rgba(255, 255, 255, 0.78);
    border-bottom: 1px solid #e7e7e7;
  }
  .hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 18px 24px 14px;
  }
  h1 {
    font-size: 22px;
    margin: 0 0 4px;
    letter-spacing: 0.3px;
  }
  .badge {
    display: inline-block;
    margin-left: 6px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background: linear-gradient(135deg, #ff3e00, #ff8a00);
    border-radius: 999px;
    vertical-align: middle;
  }
  .subtitle {
    margin: 0 0 12px;
    color: #4e5969;
    font-size: 13px;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
  .search {
    flex: 1 1 320px;
    min-width: 240px;
    height: 36px;
    padding: 0 14px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    background: #fff;
    font-size: 14px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .search:focus {
    border-color: #0052d9;
    box-shadow: 0 0 0 3px rgba(0, 82, 217, 0.15);
  }

  .ctrl {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0 10px;
    height: 36px;
    background: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    font-size: 12px;
    color: #4e5969;
  }
  .ctrl span {
    font-weight: 500;
  }
  .ctrl i {
    font-style: normal;
    color: #1f2329;
    min-width: 32px;
    text-align: right;
  }
  .ctrl input[type='color'] {
    width: 26px;
    height: 22px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
  .ctrl input[type='range'] {
    width: 110px;
  }
  .ctrl.disabled {
    opacity: 0.45;
  }

  .chk {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    font-size: 13px;
    color: #4e5969;
    cursor: pointer;
    user-select: none;
  }

  .grid {
    max-width: 1280px;
    margin: 0 auto;
    padding: 18px 18px 64px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
    gap: 10px;
  }

  .cell {
    appearance: none;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    padding: 14px 8px 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.15s ease;
    font-family: inherit;
    color: inherit;
  }
  .cell:hover {
    background: #fff;
    border-color: #e7e7e7;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }
  .ico {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 11px;
    color: #4e5969;
    text-align: center;
    word-break: break-all;
    line-height: 1.35;
    max-width: 100%;
  }

  .toast {
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.82);
    color: #fff;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
    animation: pop 0.18s ease;
    z-index: 100;
  }
  @keyframes pop {
    from {
      opacity: 0;
      transform: translate(-50%, 6px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>
