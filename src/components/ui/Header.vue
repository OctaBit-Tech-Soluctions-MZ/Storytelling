<template>
    <nav class="bg-blue-500/10 text-white shadow">
        <div class="container mx-auto px-4 flex items-center justify-between h-16">
            <a class="flex items-center text-white text-lg font-semibold">
                <i class="fas fa-book mr-2"></i> StoryTelling - OTS
            </a>

            <!-- Botão Hamburguer Mobile -->
            <button class="lg:hidden">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Links Desktop -->
            <div class="hidden lg:flex items-center space-x-6">

                <!-- Dropdown Desktop -->
                <div class="relative inline-block text-left">
                    <button
                        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <i class="bi bi-person"></i>
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <div
                        class="hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div class="py-1 text-sm text-gray-700">
                            <a class="block px-4 py-2 hover:bg-gray-100">Perfil</a>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sair</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Menu Mobile -->
        <div class="lg:hidden px-4 pb-4">
            <a class="block py-2 text-white hover:text-gray-300 text-sm">
                <i class="bi bi-person mr-1"></i> Perfil
            </a>
            <a href="#" class="block py-2 text-white hover:text-gray-300 text-sm">
                <i class="fas fa-sign-out-alt mr-1"></i> Sair
            </a>
        </div>
    </nav>
</template>