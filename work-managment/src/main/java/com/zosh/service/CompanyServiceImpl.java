package com.zosh.service;

import com.zosh.model.Company;
import com.zosh.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
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
