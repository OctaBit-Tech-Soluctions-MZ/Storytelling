<template>
  <div class="min-h-screen bg-slate-100 text-slate-800">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <aside class="flex w-80 flex-col border-r border-slate-200 bg-white/95 backdrop-blur">
        <div class="border-b border-slate-200 px-5 py-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-slate-900">Editor Storytelling</h1>
              <p class="mt-1 text-sm text-slate-500">Crie, organize e refine a sua apresentação</p>
            </div>

            <div
              class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {{ slides.length }} slides
            </div>
          </div>
        </div>

        <div class="border-b border-slate-200 px-5 py-4">
          <button
            @click="addSlide"
            class="w-full rounded-2xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Novo slide
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            @click="selectSlide(index)"
            class="group cursor-pointer rounded-3xl border p-3 transition-all duration-200"
            :class="
              currentSlideIndex === index
                ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            "
          >
            <div class="mb-3 flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-bold text-slate-800">
                  {{ slide.name || `Slide ${index + 1}` }}
                </p>
                <p class="mt-0.5 text-xs text-slate-500">{{ slide.elements.length }} elemento(s)</p>
              </div>

              <div
                class="rounded-xl px-2 py-1 text-[11px] font-semibold"
                :class="
                  currentSlideIndex === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                "
              >
                {{ index + 1 }}
              </div>
            </div>

            <div
              class="relative overflow-hidden rounded-2xl border"
              :class="
                currentSlideIndex === index
                  ? 'border-blue-200 bg-white'
                  : 'border-slate-200 bg-slate-50'
              "
              style="height: 112px"
            >
              <div
                v-for="element in slide.elements"
                :key="element.id"
                class="absolute overflow-hidden rounded"
                :style="{
                  left: scalePreview(element.x) + 'px',
                  top: scalePreview(element.y) + 'px',
                  width: scalePreview(element.width) + 'px',
                  height: scalePreview(element.height) + 'px',
                  zIndex: element.zIndex,
                }"
              >
                <template v-if="element.type === 'text'">
                  <div
                    class="h-full w-full truncate px-1"
                    :style="{
                      color: element.style.color,
                      fontSize: Math.max(8, scalePreviewFont(element.style.fontSize)) + 'px',
                      fontWeight: element.style.fontWeight,
                      fontStyle: element.style.fontStyle,
                      textDecoration: element.style.textDecoration,
                      textAlign: element.style.textAlign,
                    }"
                  >
                    {{ element.content }}
                  </div>
                </template>

                <template v-else>
                  <img :src="element.src" alt="Preview" class="h-full w-full object-cover" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <main class="flex flex-1 flex-col overflow-hidden">
        <!-- Topbar -->
        <header class="border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-3">
                <h2 class="truncate text-xl font-bold tracking-tight text-slate-900">
                  {{ presentationTitle }}
                </h2>

                <div
                  class="rounded-full border px-3 py-1 text-xs font-semibold"
                  :class="
                    saveStatus === 'saved'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-amber-200 bg-amber-50 text-amber-700'
                  "
                >
                  {{ saveStatus === 'saved' ? 'Salvo' : 'Alterações não salvas' }}
                </div>
              </div>

              <p class="mt-1 text-sm text-slate-500">
                Slide {{ currentSlideIndex + 1 }} de {{ slides.length }}
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                @click="goBack"
                class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Voltar
              </button>

              <button
                @click="savePresentation"
                class="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Salvar
              </button>

              <button
                class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Apresentar
              </button>

              <div class="mx-1 h-8 w-px bg-slate-200"></div>

              <button
                @click="goToFirstSlide"
                :disabled="currentSlideIndex === 0"
                class="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ⏮
              </button>

              <button
                @click="goToPrevSlide"
                :disabled="currentSlideIndex === 0"
                class="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ◀
              </button>

              <button
                @click="goToNextSlide"
                :disabled="currentSlideIndex === slides.length - 1"
                class="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ▶
              </button>

              <button
                @click="goToLastSlide"
                :disabled="currentSlideIndex === slides.length - 1"
                class="rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ⏭
              </button>

              <button
                @click="showPropertiesPanel = !showPropertiesPanel"
                class="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                title="Mostrar/Ocultar propriedades"
              >
                <div class="space-y-1">
                  <span class="block h-0.5 w-5 bg-slate-700"></span>
                  <span class="block h-0.5 w-5 bg-slate-700"></span>
                  <span class="block h-0.5 w-5 bg-slate-700"></span>
                </div>
              </button>
            </div>
          </div>
        </header>

        <!-- Toolbar -->
        <div class="border-b border-slate-200 bg-white px-4 py-3">
          <div class="flex flex-wrap items-center gap-3">
            <ToolbarGroup title="Slide">
              <ToolbarButton @click="duplicateCurrentSlide">Duplicar</ToolbarButton>
              <ToolbarButton @click="removeCurrentSlide" :disabled="slides.length === 1">
                Remover
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup title="Inserir">
              <ToolbarButton @click="addTextElement">Texto</ToolbarButton>
              <label
                class="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
              >
                Imagem
                <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
              </label>
            </ToolbarGroup>

            <ToolbarGroup title="Elemento">
              <ToolbarButton @click="duplicateSelectedElement" :disabled="!selectedElement">
                Duplicar
              </ToolbarButton>
              <ToolbarButton @click="deleteSelectedElement" :disabled="!selectedElement">
                Apagar
              </ToolbarButton>
              <ToolbarButton @click="bringForward" :disabled="!selectedElement">
                Frente
              </ToolbarButton>
              <ToolbarButton @click="sendBackward" :disabled="!selectedElement">
                Trás
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup title="Texto" :muted="!isTextSelected">
              <ToolbarButton @click="toggleBold" :disabled="!isTextSelected"> B </ToolbarButton>
              <ToolbarButton @click="toggleItalic" :disabled="!isTextSelected"> I </ToolbarButton>
              <ToolbarButton @click="toggleUnderline" :disabled="!isTextSelected">
                U
              </ToolbarButton>

              <select
                :value="isTextSelected ? selectedElement.style.fontSize : 16"
                @change="updateSelectedFontSize"
                :disabled="!isTextSelected"
                class="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none disabled:cursor-not-allowed"
              >
                <option v-for="size in fontSizes" :key="size" :value="size">{{ size }} px</option>
              </select>

              <input
                :value="isTextSelected ? selectedElement.style.color : '#000000'"
                @input="updateSelectedTextColor"
                :disabled="!isTextSelected"
                type="color"
                class="h-10 w-12 rounded-2xl border border-slate-200 bg-white p-1 disabled:cursor-not-allowed"
              />

              <ToolbarButton @click="setTextAlign('left')" :disabled="!isTextSelected">
                Esq.
              </ToolbarButton>
              <ToolbarButton @click="setTextAlign('center')" :disabled="!isTextSelected">
                Centro
              </ToolbarButton>
              <ToolbarButton @click="setTextAlign('right')" :disabled="!isTextSelected">
                Dir.
              </ToolbarButton>
            </ToolbarGroup>
          </div>
        </div>

        <!-- Workspace -->
        <div class="flex flex-1 overflow-hidden">
          <section
            class="relative flex-1 overflow-auto bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100"
          >
            <div class="flex min-h-full items-center justify-center p-8">
              <div class="w-full max-w-[1500px]">
                <div class="mb-5 flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-slate-800">Área de edição</h3>
                    <p class="text-sm text-slate-500">
                      Edite o conteúdo do slide com foco no resultado final
                    </p>
                  </div>

                  <div
                    class="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm"
                  >
                    {{ currentSlide.name || `Slide ${currentSlideIndex + 1}` }}
                  </div>
                </div>

                <div
                  class="rounded-[34px] border border-slate-200 bg-white/75 p-4 shadow-xl backdrop-blur-sm md:p-5"
                >
                  <div class="flex justify-center">
                    <div
                      ref="canvasRef"
                      class="relative select-none overflow-hidden rounded-[30px] border border-slate-300 bg-white shadow-2xl"
                      :style="{
                        width: canvasWidth + 'px',
                        height: canvasHeight + 'px',
                        background: currentSlide.background,
                      }"
                      @mousedown="clearSelection"
                    >
                      <div
                        v-for="element in currentSlide.elements"
                        :key="element.id"
                        class="absolute"
                        :class="selectedElementId === element.id ? 'ring-2 ring-blue-500' : ''"
                        :style="{
                          left: element.x + 'px',
                          top: element.y + 'px',
                          width: element.width + 'px',
                          height: element.height + 'px',
                          zIndex: element.zIndex,
                          cursor:
                            dragging && selectedElementId === element.id ? 'grabbing' : 'grab',
                        }"
                        @mousedown.stop="startDrag($event, element.id)"
                        @click.stop="selectElement(element.id)"
                      >
                        <template v-if="element.type === 'text'">
                          <div
                            class="h-full w-full rounded-lg px-2 py-1 outline-none"
                            :contenteditable="selectedElementId === element.id"
                            suppressContentEditableWarning="true"
                            :style="{
                              color: element.style.color,
                              fontSize: element.style.fontSize + 'px',
                              fontWeight: element.style.fontWeight,
                              fontStyle: element.style.fontStyle,
                              textDecoration: element.style.textDecoration,
                              textAlign: element.style.textAlign,
                              backgroundColor: element.style.backgroundColor,
                              opacity: element.style.opacity,
                              borderRadius: element.style.borderRadius + 'px',
                              lineHeight: '1.2',
                              overflowWrap: 'break-word',
                              width: '100%',
                              height: '100%',
                            }"
                            @input="updateTextContent($event, element.id)"
                          >
                            {{ element.content }}
                          </div>
                        </template>

                        <template v-else>
                          <img
                            :src="element.src"
                            alt="Imagem do slide"
                            class="h-full w-full pointer-events-none"
                            :style="{
                              objectFit: element.style.objectFit || 'cover',
                              opacity: element.style.opacity,
                              borderRadius: element.style.borderRadius + 'px',
                            }"
                          />
                        </template>

                        <template v-if="selectedElementId === element.id">
                          <div
                            class="absolute -left-2 -top-2 h-4 w-4 cursor-nwse-resize rounded-full border-2 border-white bg-blue-600 shadow"
                            @mousedown.stop="startResize($event, element.id, 'top-left')"
                          ></div>
                          <div
                            class="absolute -right-2 -top-2 h-4 w-4 cursor-nesw-resize rounded-full border-2 border-white bg-blue-600 shadow"
                            @mousedown.stop="startResize($event, element.id, 'top-right')"
                          ></div>
                          <div
                            class="absolute -bottom-2 -left-2 h-4 w-4 cursor-nesw-resize rounded-full border-2 border-white bg-blue-600 shadow"
                            @mousedown.stop="startResize($event, element.id, 'bottom-left')"
                          ></div>
                          <div
                            class="absolute -bottom-2 -right-2 h-4 w-4 cursor-nwse-resize rounded-full border-2 border-white bg-blue-600 shadow"
                            @mousedown.stop="startResize($event, element.id, 'bottom-right')"
                          ></div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Properties -->
          <aside
            v-if="showPropertiesPanel"
            class="w-[380px] overflow-y-auto border-l border-slate-200 bg-white"
          >
            <div class="border-b border-slate-200 p-5">
              <h3 class="text-lg font-bold text-slate-900">Propriedades</h3>
              <p class="text-sm text-slate-500">Ajuste o slide e os elementos selecionados</p>
            </div>

            <div class="border-b border-slate-200">
              <button
                @click="toggleAccordion('slide')"
                class="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span class="font-semibold text-slate-800">Slide</span>
                <span class="text-slate-500">
                  {{ openAccordions.slide ? '−' : '+' }}
                </span>
              </button>

              <div v-if="openAccordions.slide" class="space-y-4 px-5 pb-5">
                <div>
                  <label class="mb-1 block text-sm font-medium text-slate-700">
                    Nome do slide
                  </label>
                  <input
                    v-model="currentSlide.name"
                    @input="markUnsaved"
                    type="text"
                    placeholder="Ex: Introdução"
                    class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium text-slate-700">
                    Cor de fundo
                  </label>
                  <input
                    v-model="currentSlide.background"
                    @input="markUnsaved"
                    type="color"
                    class="h-12 w-full rounded-2xl border border-slate-300 bg-white p-1"
                  />
                </div>
              </div>
            </div>

            <div v-if="!selectedElement" class="p-5">
              <div
                class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"
              >
                <p class="text-sm text-slate-500">
                  Selecione um elemento no slide para editar as propriedades.
                </p>
              </div>
            </div>

            <div v-else>
              <div class="border-b border-slate-200">
                <button
                  @click="toggleAccordion('content')"
                  class="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span class="font-semibold text-slate-800">Conteúdo</span>
                  <span class="text-slate-500">
                    {{ openAccordions.content ? '−' : '+' }}
                  </span>
                </button>

                <div v-if="openAccordions.content" class="space-y-4 px-5 pb-5">
                  <div v-if="selectedElement.type === 'text'">
                    <label class="mb-1 block text-sm font-medium text-slate-700"> Texto </label>
                    <textarea
                      v-model="selectedElement.content"
                      @input="markUnsaved"
                      rows="4"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    ></textarea>
                  </div>

                  <div v-if="selectedElement.type === 'image'">
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Ajuste da imagem
                    </label>
                    <select
                      v-model="selectedElement.style.objectFit"
                      @change="markUnsaved"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    >
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                      <option value="fill">Fill</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="border-b border-slate-200">
                <button
                  @click="toggleAccordion('style')"
                  class="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span class="font-semibold text-slate-800">Estilo</span>
                  <span class="text-slate-500">
                    {{ openAccordions.style ? '−' : '+' }}
                  </span>
                </button>

                <div v-if="openAccordions.style" class="space-y-4 px-5 pb-5">
                  <div v-if="selectedElement.type === 'text'">
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Tamanho da fonte
                    </label>
                    <input
                      v-model.number="selectedElement.style.fontSize"
                      @input="markUnsaved"
                      type="range"
                      min="12"
                      max="96"
                      class="w-full"
                    />
                    <p class="mt-1 text-xs text-slate-500">
                      {{ selectedElement.style.fontSize }} px
                    </p>
                  </div>

                  <div v-if="selectedElement.type === 'text'">
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Cor do texto
                    </label>
                    <input
                      v-model="selectedElement.style.color"
                      @input="markUnsaved"
                      type="color"
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white p-1"
                    />
                  </div>

                  <div v-if="selectedElement.type === 'text'" class="grid grid-cols-3 gap-2">
                    <button
                      @click="toggleBold"
                      class="rounded-2xl border px-3 py-2 text-sm font-semibold"
                      :class="
                        selectedElement.style.fontWeight === 'bold'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      "
                    >
                      B
                    </button>

                    <button
                      @click="toggleItalic"
                      class="rounded-2xl border px-3 py-2 text-sm italic"
                      :class="
                        selectedElement.style.fontStyle === 'italic'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      "
                    >
                      I
                    </button>

                    <button
                      @click="toggleUnderline"
                      class="rounded-2xl border px-3 py-2 text-sm underline"
                      :class="
                        selectedElement.style.textDecoration === 'underline'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-300 bg-white text-slate-700'
                      "
                    >
                      U
                    </button>
                  </div>

                  <div v-if="selectedElement.type === 'text'">
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Alinhamento
                    </label>
                    <div class="grid grid-cols-3 gap-2">
                      <button
                        @click="setSelectedTextAlign('left')"
                        class="rounded-2xl border px-3 py-2 text-sm"
                        :class="
                          selectedElement.style.textAlign === 'left'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-300 bg-white text-slate-700'
                        "
                      >
                        Esq.
                      </button>
                      <button
                        @click="setSelectedTextAlign('center')"
                        class="rounded-2xl border px-3 py-2 text-sm"
                        :class="
                          selectedElement.style.textAlign === 'center'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-300 bg-white text-slate-700'
                        "
                      >
                        Centro
                      </button>
                      <button
                        @click="setSelectedTextAlign('right')"
                        class="rounded-2xl border px-3 py-2 text-sm"
                        :class="
                          selectedElement.style.textAlign === 'right'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-300 bg-white text-slate-700'
                        "
                      >
                        Dir.
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Fundo do elemento
                    </label>
                    <input
                      v-model="selectedElement.style.backgroundColor"
                      @input="markUnsaved"
                      type="color"
                      class="h-12 w-full rounded-2xl border border-slate-300 bg-white p-1"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700"> Opacidade </label>
                    <input
                      v-model.number="selectedElement.style.opacity"
                      @input="markUnsaved"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      class="w-full"
                    />
                    <p class="mt-1 text-xs text-slate-500">
                      {{ selectedElement.style.opacity }}
                    </p>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Borda arredondada
                    </label>
                    <input
                      v-model.number="selectedElement.style.borderRadius"
                      @input="markUnsaved"
                      type="range"
                      min="0"
                      max="50"
                      class="w-full"
                    />
                    <p class="mt-1 text-xs text-slate-500">
                      {{ selectedElement.style.borderRadius }} px
                    </p>
                  </div>
                </div>
              </div>

              <div class="border-b border-slate-200">
                <button
                  @click="toggleAccordion('position')"
                  class="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span class="font-semibold text-slate-800">Posição e tamanho</span>
                  <span class="text-slate-500">
                    {{ openAccordions.position ? '−' : '+' }}
                  </span>
                </button>

                <div v-if="openAccordions.position" class="grid grid-cols-2 gap-4 px-5 pb-5">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">X</label>
                    <input
                      v-model.number="selectedElement.x"
                      @input="markUnsaved"
                      type="number"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">Y</label>
                    <input
                      v-model.number="selectedElement.y"
                      @input="markUnsaved"
                      type="number"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">Largura</label>
                    <input
                      v-model.number="selectedElement.width"
                      @input="markUnsaved"
                      type="number"
                      min="40"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">Altura</label>
                    <input
                      v-model.number="selectedElement.height"
                      @input="markUnsaved"
                      type="number"
                      min="40"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div class="border-b border-slate-200">
                <button
                  @click="toggleAccordion('layers')"
                  class="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span class="font-semibold text-slate-800">Camadas</span>
                  <span class="text-slate-500">
                    {{ openAccordions.layers ? '−' : '+' }}
                  </span>
                </button>

                <div v-if="openAccordions.layers" class="space-y-3 px-5 pb-5">
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      @click="bringForward"
                      class="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                    >
                      Trazer para frente
                    </button>

                    <button
                      @click="sendBackward"
                      class="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                    >
                      Mandar para trás
                    </button>
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium text-slate-700">
                      Ordem da camada
                    </label>
                    <input
                      v-model.number="selectedElement.zIndex"
                      @input="markUnsaved"
                      type="number"
                      min="1"
                      class="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div class="p-5">
                <button
                  @click="deleteSelectedElement"
                  class="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Apagar elemento
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>

    <!-- Modal -->
    <div
      v-if="showBackConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h3 class="text-lg font-bold text-slate-900">Confirmar saída</h3>
        <p class="mt-2 text-sm text-slate-600">Tem certeza que quer voltar?</p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="showBackConfirm = false"
            class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Não
          </button>

          <button
            @click="confirmBack"
            class="rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Sim
          </button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div
      v-if="showSaveToast"
      class="fixed bottom-6 right-6 z-50 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-xl"
    >
      Apresentação salva com sucesso.
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const presentationTitle = ref('Apresentação Storytelling')
const saveStatus = ref('saved')
const canvasWidth = 1280
const canvasHeight = 720
const minElementWidth = 60
const minElementHeight = 40
const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96]

const canvasRef = ref(null)
const showPropertiesPanel = ref(true)
const showBackConfirm = ref(false)
const showSaveToast = ref(false)

const openAccordions = ref({
  slide: true,
  content: true,
  style: true,
  position: true,
  layers: true,
})

const ToolbarGroup = defineComponent({
  name: 'ToolbarGroup',
  props: {
    title: { type: String, required: true },
    muted: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: [
            'flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2',
            props.muted ? 'opacity-60' : '',
          ],
        },
        [
          h(
            'span',
            {
              class: 'text-xs font-semibold uppercase tracking-wide text-slate-500',
            },
            props.title,
          ),
          ...(slots.default ? slots.default() : []),
        ],
      )
  },
})

const ToolbarButton = defineComponent({
  name: 'ToolbarButton',
  props: {
    disabled: { type: Boolean, default: false },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () =>
      h(
        'button',
        {
          disabled: props.disabled,
          onClick: (e) => emit('click', e),
          class:
            'rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50',
        },
        slots.default ? slots.default() : [],
      )
  },
})

function generateId() {
  return Math.random().toString(36).slice(2, 11)
}

const slides = ref([
  {
    id: generateId(),
    name: 'Introdução',
    background: '#ffffff',
    elements: [
      {
        id: generateId(),
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop',
        x: 200,
        y: 120,
        width: 700,
        height: 360,
        zIndex: 1,
        style: {
          opacity: 1,
          borderRadius: 18,
          objectFit: 'cover',
          backgroundColor: '#ffffff',
        },
      },
      {
        id: generateId(),
        type: 'text',
        content: 'Título principal do slide',
        x: 260,
        y: 160,
        width: 500,
        height: 90,
        zIndex: 2,
        style: {
          color: '#ffffff',
          fontSize: 40,
          fontWeight: 'bold',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          backgroundColor: 'transparent',
          opacity: 1,
          borderRadius: 12,
        },
      },
      {
        id: generateId(),
        type: 'text',
        content: 'Texto por cima da imagem com aparência profissional.',
        x: 260,
        y: 250,
        width: 470,
        height: 100,
        zIndex: 3,
        style: {
          color: '#f8fafc',
          fontSize: 20,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          backgroundColor: 'transparent',
          opacity: 1,
          borderRadius: 10,
        },
      },
    ],
  },
])

const currentSlideIndex = ref(0)
const selectedElementId = ref(null)

const dragging = ref(false)
const resizing = ref(false)

const dragOffset = ref({ x: 0, y: 0 })

const resizeState = ref({
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startElementX: 0,
  startElementY: 0,
  handle: 'bottom-right',
})

const currentSlide = computed(() => slides.value[currentSlideIndex.value])

const selectedElement = computed(
  () => currentSlide.value.elements.find((el) => el.id === selectedElementId.value) || null,
)

const isTextSelected = computed(() => selectedElement.value?.type === 'text')

function markUnsaved() {
  saveStatus.value = 'unsaved'
}

function toggleAccordion(key) {
  openAccordions.value[key] = !openAccordions.value[key]
}

function selectSlide(index) {
  currentSlideIndex.value = index
  selectedElementId.value = null
}

function addSlide() {
  slides.value.push({
    id: generateId(),
    name: `Novo slide ${slides.value.length + 1}`,
    background: '#ffffff',
    elements: [],
  })
  currentSlideIndex.value = slides.value.length - 1
  selectedElementId.value = null
  markUnsaved()
}

function duplicateCurrentSlide() {
  const original = currentSlide.value
  const clone = JSON.parse(JSON.stringify(original))
  clone.id = generateId()
  clone.name = `${original.name || 'Slide'} (cópia)`
  clone.elements = clone.elements.map((el) => ({
    ...el,
    id: generateId(),
  }))

  slides.value.splice(currentSlideIndex.value + 1, 0, clone)
  currentSlideIndex.value += 1
  selectedElementId.value = null
  markUnsaved()
}

function removeCurrentSlide() {
  if (slides.value.length === 1) return

  slides.value.splice(currentSlideIndex.value, 1)

  if (currentSlideIndex.value >= slides.value.length) {
    currentSlideIndex.value = slides.value.length - 1
  }

  selectedElementId.value = null
  markUnsaved()
}

function addTextElement() {
  const newElement = {
    id: generateId(),
    type: 'text',
    content: 'Novo texto',
    x: 120,
    y: 120,
    width: 320,
    height: 100,
    zIndex: getNextZIndex(),
    style: {
      color: '#0f172a',
      fontSize: 28,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textDecoration: 'none',
      textAlign: 'left',
      backgroundColor: 'transparent',
      opacity: 1,
      borderRadius: 8,
    },
  }

  currentSlide.value.elements.push(newElement)
  selectedElementId.value = newElement.id
  markUnsaved()
}

function handleImageUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const newElement = {
      id: generateId(),
      type: 'image',
      src: e.target.result,
      x: 180,
      y: 140,
      width: 420,
      height: 260,
      zIndex: getNextZIndex(),
      style: {
        opacity: 1,
        borderRadius: 16,
        objectFit: 'cover',
        backgroundColor: '#ffffff',
      },
    }

    currentSlide.value.elements.push(newElement)
    selectedElementId.value = newElement.id
    markUnsaved()
  }

  reader.readAsDataURL(file)
  event.target.value = ''
}

function duplicateSelectedElement() {
  if (!selectedElement.value) return

  const clone = JSON.parse(JSON.stringify(selectedElement.value))
  clone.id = generateId()
  clone.x += 30
  clone.y += 30
  clone.zIndex = getNextZIndex()

  currentSlide.value.elements.push(clone)
  selectedElementId.value = clone.id
  markUnsaved()
}

function getNextZIndex() {
  if (!currentSlide.value.elements.length) return 1
  return Math.max(...currentSlide.value.elements.map((el) => el.zIndex || 1)) + 1
}

function selectElement(id) {
  selectedElementId.value = id
}

function clearSelection() {
  selectedElementId.value = null
}

function updateTextContent(event, id) {
  const element = currentSlide.value.elements.find((el) => el.id === id)
  if (element) {
    element.content = event.target.innerText
    markUnsaved()
  }
}

function startDrag(event, id) {
  const element = currentSlide.value.elements.find((el) => el.id === id)
  if (!element || !canvasRef.value || resizing.value) return

  selectedElementId.value = id
  dragging.value = true

  const rect = canvasRef.value.getBoundingClientRect()
  dragOffset.value = {
    x: event.clientX - rect.left - element.x,
    y: event.clientY - rect.top - element.y,
  }

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(event) {
  if (!dragging.value || !selectedElement.value || !canvasRef.value) return

  const rect = canvasRef.value.getBoundingClientRect()

  let newX = event.clientX - rect.left - dragOffset.value.x
  let newY = event.clientY - rect.top - dragOffset.value.y

  newX = Math.max(0, Math.min(newX, canvasWidth - selectedElement.value.width))
  newY = Math.max(0, Math.min(newY, canvasHeight - selectedElement.value.height))

  selectedElement.value.x = Math.round(newX)
  selectedElement.value.y = Math.round(newY)
  markUnsaved()
}

function stopDrag() {
  dragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}

function startResize(event, id, handle) {
  const element = currentSlide.value.elements.find((el) => el.id === id)
  if (!element) return

  selectedElementId.value = id
  resizing.value = true

  resizeState.value = {
    startX: event.clientX,
    startY: event.clientY,
    startWidth: element.width,
    startHeight: element.height,
    startElementX: element.x,
    startElementY: element.y,
    handle,
  }

  window.addEventListener('mousemove', onResize)
  window.addEventListener('mouseup', stopResize)
}

function onResize(event) {
  if (!resizing.value || !selectedElement.value) return

  const dx = event.clientX - resizeState.value.startX
  const dy = event.clientY - resizeState.value.startY
  const handle = resizeState.value.handle

  let newWidth = resizeState.value.startWidth
  let newHeight = resizeState.value.startHeight
  let newX = resizeState.value.startElementX
  let newY = resizeState.value.startElementY

  if (handle === 'bottom-right') {
    newWidth = resizeState.value.startWidth + dx
    newHeight = resizeState.value.startHeight + dy
  }

  if (handle === 'bottom-left') {
    newWidth = resizeState.value.startWidth - dx
    newHeight = resizeState.value.startHeight + dy
    newX = resizeState.value.startElementX + dx
  }

  if (handle === 'top-right') {
    newWidth = resizeState.value.startWidth + dx
    newHeight = resizeState.value.startHeight - dy
    newY = resizeState.value.startElementY + dy
  }

  if (handle === 'top-left') {
    newWidth = resizeState.value.startWidth - dx
    newHeight = resizeState.value.startHeight - dy
    newX = resizeState.value.startElementX + dx
    newY = resizeState.value.startElementY + dy
  }

  if (newWidth < minElementWidth) {
    if (handle === 'bottom-left' || handle === 'top-left') {
      newX -= minElementWidth - newWidth
    }
    newWidth = minElementWidth
  }

  if (newHeight < minElementHeight) {
    if (handle === 'top-left' || handle === 'top-right') {
      newY -= minElementHeight - newHeight
    }
    newHeight = minElementHeight
  }

  newX = Math.max(0, Math.min(newX, canvasWidth - newWidth))
  newY = Math.max(0, Math.min(newY, canvasHeight - newHeight))

  if (newX + newWidth > canvasWidth) {
    newWidth = canvasWidth - newX
  }

  if (newY + newHeight > canvasHeight) {
    newHeight = canvasHeight - newY
  }

  selectedElement.value.x = Math.round(newX)
  selectedElement.value.y = Math.round(newY)
  selectedElement.value.width = Math.round(Math.max(minElementWidth, newWidth))
  selectedElement.value.height = Math.round(Math.max(minElementHeight, newHeight))
  markUnsaved()
}

function stopResize() {
  resizing.value = false
  window.removeEventListener('mousemove', onResize)
  window.removeEventListener('mouseup', stopResize)
}

function bringForward() {
  if (!selectedElement.value) return
  selectedElement.value.zIndex += 1
  markUnsaved()
}

function sendBackward() {
  if (!selectedElement.value) return
  selectedElement.value.zIndex = Math.max(1, selectedElement.value.zIndex - 1)
  markUnsaved()
}

function deleteSelectedElement() {
  if (!selectedElement.value) return

  currentSlide.value.elements = currentSlide.value.elements.filter(
    (el) => el.id !== selectedElementId.value,
  )

  selectedElementId.value = null
  markUnsaved()
}

function toggleBold() {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.fontWeight =
    selectedElement.value.style.fontWeight === 'bold' ? 'normal' : 'bold'
  markUnsaved()
}

function toggleItalic() {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.fontStyle =
    selectedElement.value.style.fontStyle === 'italic' ? 'normal' : 'italic'
  markUnsaved()
}

function toggleUnderline() {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.textDecoration =
    selectedElement.value.style.textDecoration === 'underline' ? 'none' : 'underline'
  markUnsaved()
}

function setTextAlign(align) {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.textAlign = align
  markUnsaved()
}

function setSelectedTextAlign(align) {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.textAlign = align
  markUnsaved()
}

function updateSelectedFontSize(event) {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.fontSize = Number(event.target.value)
  markUnsaved()
}

function updateSelectedTextColor(event) {
  if (!selectedElement.value || selectedElement.value.type !== 'text') return
  selectedElement.value.style.color = event.target.value
  markUnsaved()
}

function goToFirstSlide() {
  currentSlideIndex.value = 0
  selectedElementId.value = null
}

function goToPrevSlide() {
  if (currentSlideIndex.value > 0) {
    currentSlideIndex.value--
    selectedElementId.value = null
  }
}

function goToNextSlide() {
  if (currentSlideIndex.value < slides.value.length - 1) {
    currentSlideIndex.value++
    selectedElementId.value = null
  }
}

function goToLastSlide() {
  currentSlideIndex.value = slides.value.length - 1
  selectedElementId.value = null
}

function savePresentation() {
  const payload = {
    title: presentationTitle.value,
    updatedAt: new Date().toISOString(),
    slides: slides.value,
  }

  localStorage.setItem('storytelling_presentation_draft', JSON.stringify(payload))

  saveStatus.value = 'saved'
  showSaveToast.value = true
  setTimeout(() => {
    showSaveToast.value = false
  }, 2200)
}

function goBack() {
  showBackConfirm.value = true
}

function confirmBack() {
  showBackConfirm.value = false
  router.push('/home')
}

function scalePreview(value) {
  return value * 0.12
}

function scalePreviewFont(value) {
  return value * 0.12
}
</script>

<style scoped>
[contenteditable='true']:focus {
  outline: none;
}
</style>
