package com.zosh.service;

import com.zosh.model.Company;

import java.util.List;

public interface CompanyService {
    Company saveCompany(Company company);
    Company getCompanyById(Long id) throws Exception;
    List<Company> getAllCompanies(String city);
    Company updateCompany(Long id, Company company) throws Exception;
    void deleteCompany(Long id);
}
