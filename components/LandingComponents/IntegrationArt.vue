<template>
  <!-- Decorative: the text next to it names the integration. Brand colours only, authored SVG. -->
  <svg class="integration-art" viewBox="0 0 320 220" fill="none" aria-hidden="true" focusable="false">
    <!-- Standalone page: browser window with the sommelier and a QR code in front -->
    <g v-if="kind === 'page'">
      <rect x="22" y="22" width="224" height="150" rx="14" fill="#fff" class="integration-art__lift"/>
      <path d="M22 36a14 14 0 0 1 14-14h196a14 14 0 0 1 14 14v10H22V36Z" fill="#EFE8FD"/>
      <circle cx="38" cy="34" r="3.5" fill="#CDBBF7"/><circle cx="50" cy="34" r="3.5" fill="#CDBBF7"/><circle cx="62" cy="34" r="3.5" fill="#CDBBF7"/>
      <rect x="82" y="27" width="140" height="14" rx="7" fill="#fff"/>
      <text x="152" y="37" text-anchor="middle" font-size="8.5" fill="#5B3BD0" font-family="Poppins, sans-serif">your-shop.wineater.com</text>
      <rect x="40" y="60" width="188" height="26" rx="13" fill="#fff" stroke="#7E27ED" stroke-width="2"/>
      <circle cx="56" cy="73" r="5" stroke="#7E27ED" stroke-width="2"/><path d="m60 77 4 4" stroke="#7E27ED" stroke-width="2" stroke-linecap="round"/>
      <rect x="72" y="70" width="70" height="6" rx="3" fill="#D9C8FA"/>
      <rect x="196" y="63" width="29" height="20" rx="10" fill="#7E27ED"/>
      <g>
        <path d="M63 108h8v4l3 5v28a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-28l3-5v-4Z" fill="#3A1470"/><rect x="62" y="130" width="10" height="12" rx="1.5" fill="#fff"/>
        <path d="M99 100h8v10l3 5v32a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-32l3-5v-10Z" fill="#7E27ED"/><rect x="98" y="128" width="10" height="12" rx="1.5" fill="#fff"/>
        <path d="M135 108h8v4l3 5v28a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-28l3-5v-4Z" fill="#5B22B0"/><rect x="134" y="130" width="10" height="12" rx="1.5" fill="#fff"/>
        <path d="M171 102h8v8l3 5v30a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3v-30l3-5v-8Z" fill="#3A1470"/><rect x="170" y="128" width="10" height="12" rx="1.5" fill="#fff"/>
        <rect x="52" y="150" width="148" height="4" rx="2" fill="#D9C8FA"/>
      </g>
      <!-- QR code -->
      <rect x="206" y="104" width="94" height="94" rx="14" fill="#fff" class="integration-art__lift"/>
      <g fill="#1A1426">
        <path fill-rule="evenodd" d="M218 116h22v22h-22v-22Zm4 4v14h14v-14h-14Z"/><rect x="226" y="124" width="6" height="6"/>
        <path fill-rule="evenodd" d="M266 116h22v22h-22v-22Zm4 4v14h14v-14h-14Z"/><rect x="274" y="124" width="6" height="6"/>
        <path fill-rule="evenodd" d="M218 164h22v22h-22v-22Zm4 4v14h14v-14h-14Z"/><rect x="226" y="172" width="6" height="6"/>
        <rect x="246" y="116" width="6" height="6"/><rect x="252" y="128" width="6" height="6"/><rect x="246" y="140" width="6" height="6"/>
        <rect x="258" y="146" width="6" height="6"/><rect x="270" y="146" width="6" height="6"/><rect x="282" y="152" width="6" height="6"/>
        <rect x="246" y="158" width="6" height="6"/><rect x="258" y="170" width="6" height="6"/><rect x="270" y="164" width="6" height="6"/>
        <rect x="282" y="176" width="6" height="6"/><rect x="246" y="180" width="6" height="6"/><rect x="226" y="146" width="6" height="6"/>
      </g>
    </g>

    <!-- Embedded widget: a shop page with the sommelier sitting inside it -->
    <g v-else-if="kind === 'widget'">
      <rect x="20" y="20" width="250" height="168" rx="14" fill="#fff" class="integration-art__lift"/>
      <path d="M20 34a14 14 0 0 1 14-14h222a14 14 0 0 1 14 14v10H20V34Z" fill="#EFE8FD"/>
      <rect x="34" y="27" width="46" height="10" rx="5" fill="#CDBBF7"/>
      <rect x="196" y="28" width="22" height="8" rx="4" fill="#D9C8FA"/><rect x="224" y="28" width="30" height="8" rx="4" fill="#D9C8FA"/>
      <!-- the shop's own page -->
      <rect x="34" y="58" width="92" height="64" rx="10" fill="#F3EFE9"/>
      <rect x="34" y="130" width="64" height="7" rx="3.5" fill="#D9D2E6"/><rect x="34" y="144" width="92" height="5" rx="2.5" fill="#E8E2F0"/><rect x="34" y="154" width="76" height="5" rx="2.5" fill="#E8E2F0"/>
      <rect x="34" y="168" width="52" height="12" rx="6" fill="#D9D2E6"/>
      <!-- the widget -->
      <rect x="140" y="52" width="116" height="128" rx="12" fill="#fff" stroke="#7E27ED" stroke-width="2"/>
      <rect x="150" y="62" width="96" height="20" rx="10" fill="#F5F2FF" stroke="#CDBBF7"/>
      <circle cx="161" cy="72" r="4" stroke="#7E27ED" stroke-width="1.8"/><rect x="171" y="70" width="42" height="4" rx="2" fill="#D9C8FA"/>
      <rect x="150" y="90" width="44" height="52" rx="8" fill="#F5F2FF"/><path d="M168 98h8v6l2 3v20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-20l2-3v-6Z" fill="#7E27ED"/>
      <rect x="202" y="90" width="44" height="52" rx="8" fill="#F5F2FF"/><path d="M220 98h8v6l2 3v20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-20l2-3v-6Z" fill="#3A1470"/>
      <rect x="150" y="148" width="44" height="20" rx="10" stroke="#7E27ED" stroke-width="1.8"/><rect x="202" y="148" width="44" height="20" rx="10" stroke="#7E27ED" stroke-width="1.8"/>
      <!-- the one script tag -->
      <rect x="206" y="176" width="100" height="30" rx="15" fill="#1A1426" class="integration-art__lift"/>
      <text x="256" y="195" text-anchor="middle" font-size="11" fill="#fff" font-family="ui-monospace, Menlo, monospace">&lt;script&gt;</text>
      <circle cx="222" cy="191" r="3" fill="#2FC0BF"/>
    </g>

    <!-- API: a code window and the wines coming back -->
    <g v-else>
      <rect x="22" y="24" width="190" height="150" rx="14" fill="#1A1426" class="integration-art__lift"/>
      <circle cx="40" cy="42" r="3.5" fill="#5A5069"/><circle cx="52" cy="42" r="3.5" fill="#5A5069"/><circle cx="64" cy="42" r="3.5" fill="#5A5069"/>
      <g>
        <rect x="40" y="62" width="14" height="6" rx="3" fill="#BA7BFF"/><rect x="60" y="62" width="64" height="6" rx="3" fill="#7E27ED"/>
        <rect x="52" y="78" width="28" height="6" rx="3" fill="#2FC0BF"/><rect x="86" y="78" width="78" height="6" rx="3" fill="#D9C8FA"/>
        <rect x="52" y="94" width="20" height="6" rx="3" fill="#2FC0BF"/><rect x="78" y="94" width="54" height="6" rx="3" fill="#D9C8FA"/>
        <rect x="52" y="110" width="34" height="6" rx="3" fill="#2FC0BF"/><rect x="92" y="110" width="68" height="6" rx="3" fill="#D9C8FA"/>
        <rect x="40" y="126" width="14" height="6" rx="3" fill="#BA7BFF"/>
        <rect x="40" y="146" width="40" height="14" rx="7" fill="#7E27ED"/><rect x="88" y="150" width="60" height="6" rx="3" fill="#5A5069"/>
      </g>
      <!-- result: your own interface -->
      <path d="M212 99h26" stroke="#7E27ED" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 7"/>
      <path d="m236 93 7 6-7 6" stroke="#7E27ED" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="196" y="120" width="104" height="82" rx="12" fill="#fff" class="integration-art__lift"/>
      <rect x="208" y="132" width="44" height="6" rx="3" fill="#D9C8FA"/>
      <path d="M215 148h6v5l2 3v15a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-15l2-3v-5Z" fill="#3A1470"/>
      <path d="M241 146h6v6l2 3v16a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-16l2-3v-6Z" fill="#7E27ED"/>
      <path d="M267 148h6v5l2 3v15a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-15l2-3v-5Z" fill="#5B22B0"/>
      <rect x="208" y="188" width="80" height="5" rx="2.5" fill="#E3D9FB"/>
      <rect x="226" y="56" width="74" height="34" rx="17" fill="#fff" class="integration-art__lift"/>
      <text x="263" y="78" text-anchor="middle" font-size="16" fill="#7E27ED" font-family="ui-monospace, Menlo, monospace" font-weight="700">{ }</text>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  kind: { type: String, required: true }, // 'page' | 'widget' | 'api'
});
</script>

<style scoped>
.integration-art {
  display: block;
  width: 100%;
  height: auto;
}

.integration-art__lift {
  filter: drop-shadow(0 6px 14px rgb(58 20 112 / 14%));
}
</style>
