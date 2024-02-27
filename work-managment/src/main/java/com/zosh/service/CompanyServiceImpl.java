package com.zosh.service;

import com.zosh.model.Company;
import com.zosh.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company getCompanyById(Long id) throws Exception {
        return companyRepository.findById(id)
                .orElseThrow(() -> new Exception("Company not found with id: " + id));
    }

    @Override
    public List<Company> getAllCompanies(String city) {
List<Company> companies=companyRepository.findAll();
if(city!=null){
    companies=companies.stream()
            .filter(company -> company.getAddress() != null && containsAddressKeyword(
                    company.getAddress(), city))
            .collect(Collectors.toList());
}

        return companies;
    }

    private boolean containsAddressKeyword(String address, String keyword) {
        // Check if the address contains the keyword (case-insensitive)
        return address != null && address.toLowerCase().contains(keyword.toLowerCase());
    }

    @Override
    public Company updateCompany(Long id, Company company) throws Exception {
        Company existingCompany = getCompanyById(id);
        existingCompany.setName(company.getName());
        existingCompany.setAddress(company.getAddress());
        existingCompany.setCity(company.getCity());
        existingCompany.setCountry(company.getCountry());
        existingCompany.setEmployees(company.getEmployees());
        existingCompany.setLogo(company.getLogo());
        return companyRepository.save(existingCompany);
    }

    @Override
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}
