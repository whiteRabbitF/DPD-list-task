import { defineStore } from 'pinia';
import { Person } from '../interfaces/interfaces';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        usersData: [] as Person[],
        originalUsersData: [] as Person[],
        countries: [] as string[],
        currentPage: 1,
        pageSize: 20,
        searchQuery: '',
        selectedGenders: [] as string[],
        selectedCountries: [] as string[],
        loading: false,
    }),
    actions: {
        extractCountries() {
            const uniqueCountries = new Set();

            this.originalUsersData.forEach(person => {
                uniqueCountries.add(person.location.country);
            });
            this.countries = Array.from(uniqueCountries);
        },
        formatDate(dateString: string): string {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU');
        },
        handleSearch(query: string) {
            this.searchQuery = query;
            this.currentPage = 1;
        },
        goToPage(page: number) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        applyGenderFilter(filterData) {
            this.selectedGenders = filterData.genders;

            if (this.selectedGenders.includes("all")) {
                this.currentPage = 1;
                this.usersData = this.originalUsersData.slice();
                return;
            }

            const filteredData = this.usersData.filter(person => {
                return this.selectedGenders.includes(person.gender);
            });

            this.currentPage = 1;
            this.usersData = filteredData;
        },
        applyCountryFilter(filterData) {
            this.selectedCountries = filterData.country;

            if (this.selectedCountries.length === 0) {
                this.currentPage = 1;
                this.usersData = this.originalUsersData.slice();
                return;
            }

            const filteredData = this.originalUsersData.filter(person => {
                return this.selectedCountries.includes(person.location.country);
            });

            this.currentPage = 1;
            this.usersData = filteredData;
        },
    },
    getters: {
        paginatedData(): Person[] {
            const filteredData = this.usersData.filter(person =>
                person.name.first.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                person.name.last.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                person.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                person.phone.includes(this.searchQuery)
            );
            const startIndex = (this.currentPage - 1) * this.pageSize;
            return filteredData.slice(startIndex, startIndex + this.pageSize);
        },
        totalPages(): number {
            const filteredData = this.usersData.filter(person =>
                person.name.first.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                person.name.last.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                person.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                person.phone.includes(this.searchQuery)
            );
            return Math.ceil(filteredData.length / this.pageSize);
        },
    },
});

export default useUserStore;
